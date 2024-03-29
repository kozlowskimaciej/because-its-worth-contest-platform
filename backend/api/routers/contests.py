import json
from datetime import datetime
from os.path import basename
from typing import Optional, Annotated
from urllib.parse import urlparse

from bson import ObjectId, json_util
from fastapi import APIRouter, HTTPException, Depends, Body, Query
from pydantic import BaseModel, AnyHttpUrl
from starlette.requests import Request

from backend.api.routers.auth import get_current_user
from backend.api.routers.entries import get_entries, delete_entry
from backend.emails import email_sending, email_content
from backend.api.routers.static_files import delete_file, STATIC_FOLDER_NAME

router = APIRouter(prefix="/contests", tags=["Contests"])


class Contest(BaseModel):
    name: str
    description: str
    category: str
    entryCategories: list[str]
    published: bool
    ended: bool
    deadline: datetime
    termsAndConditions: Optional[list[AnyHttpUrl]]
    acceptedFileFormats: list[str]
    background: Optional[AnyHttpUrl]


@router.post("/")
async def post_contest(
    data: Contest, request: Request, user_id: str = Depends(get_current_user)
):
    db = request.app.database

    entry_dict = data.model_dump(mode="json")
    inserted_id = (await db.contests.insert_one(entry_dict)).inserted_id

    return {"id": str(inserted_id)}


@router.get(
    "/", responses={404: {"description": "Contest with given id not found"}}
)
async def get_contests(request: Request, id: Optional[str] = None):
    db = request.app.database

    if id is None:
        data = await db.contests.find().to_list(length=None)
    else:
        data = await db.contests.find_one({"_id": ObjectId(id)})

    if not data and id:
        raise HTTPException(status_code=404, detail=f"{id=} not found")

    return {"data": json.loads(json_util.dumps(data))}


class Publication(BaseModel):
    receiver_files: list[str]
    form_url: str


def get_all_receivers(receiver_files: list[str]):
    receivers = []
    for file_name in receiver_files:
        with open(STATIC_FOLDER_NAME / file_name, "r") as file:
            receivers.extend([line.rstrip() for line in file])
    return receivers


def send_emails(receivers, email_content: str):
    email_sending.send_email(receivers, email_content)


@router.post("/{id}/publish")
async def publish_contest(
    request: Request,
    data: Publication,
    id: str,
    user_id: str = Depends(get_current_user),
):
    db = request.app.database
    contest = await db.contests.find_one({"_id": ObjectId(id)})
    if not contest:
        raise HTTPException(status_code=404, detail=f"Contest {id} not found")

    deadline_date = contest["deadline"].split("T")[0]

    mail = email_content.EmailContentGenerator.generate_contest_invitation(
        contest_name=contest["name"],
        deadline=datetime.strptime(deadline_date, "%Y-%m-%d").strftime(
            "%d.%m.%Y"
        ),
        form_url=data.form_url,
    )

    receivers = get_all_receivers(data.receiver_files)
    send_emails(receivers, mail)
    await db.contests.update_one(
        {"_id": ObjectId(id)}, {"$set": {"published": True}}
    )


@router.post(
    "/{id}/end",
    responses={409: {"description": "Contest already ended"}},
)
async def end_contest(
    request: Request,
    id: str,
    user_id: str = Depends(get_current_user),
):
    db = request.app.database

    contest = await db.contests.find_one({"_id": ObjectId(id)})
    if not contest:
        raise HTTPException(status_code=404, detail=f"{id=} not found")
    if contest["ended"]:
        raise HTTPException(status_code=409, detail=f"{id=} already ended")

    await db.contests.update_one(
        {"_id": ObjectId(id)}, {"$set": {"ended": True}}
    )

    entries = await db.entries.find(
        {"contestId": str(contest["_id"])}
    ).to_list(length=None)
    for entry in entries:
        mail = email_content.EmailContentGenerator.generate_contest_summary(
            contest_name=contest["name"], place=entry["place"]
        )
        send_emails([entry["email"]], mail)

    return {"message": "Contest ended successfully."}


async def delete_contest_files(contest: dict):
    if contest["termsAndConditions"]:
        for url in contest["termsAndConditions"]:
            filename = basename(urlparse(url).path)
            await delete_file(filename)

    if contest["background"]:
        filename = basename(urlparse(contest["background"]).path)
        await delete_file(filename)


@router.delete(
    "/", responses={404: {"description": "Contest with given id not found"}}
)
async def delete_contest(
    request: Request, id: str, user_id: str = Depends(get_current_user)
):
    db = request.app.database

    contest = await db.contests.find_one({"_id": ObjectId(id)})
    if not contest:
        raise HTTPException(status_code=404, detail=f"{id=} not found")

    await delete_contest_files(contest)

    entries = await get_entries(request, id)
    if entries:
        for entry in entries["data"]:
            await delete_entry(request, entry["_id"]["$oid"])

    await db.contests.delete_one({"_id": ObjectId(id)})

    return {"id": id}


@router.patch(
    "/", responses={404: {"description": "Contest with given id not found"}}
)
async def update_contest(
    request: Request,
    id: Annotated[str, Query()],
    data: Annotated[Contest, Body()],
    user_id: str = Depends(get_current_user),
):
    db = request.app.database

    contest = (await get_contests(request, id))["data"]

    await delete_contest_files(contest)

    entry_dict = data.model_dump(mode="json")
    data = db.contests.update_one({"_id": ObjectId(id)}, {"$set": entry_dict})

    if not data:
        raise HTTPException(status_code=404, detail=f"{id=} not found")

    return {"id": id}
