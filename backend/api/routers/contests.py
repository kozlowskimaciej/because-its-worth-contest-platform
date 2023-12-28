import json
from datetime import datetime
from typing import Optional

from bson import ObjectId, json_util
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, AnyHttpUrl
from starlette.requests import Request
from backend.api.routers.auth import get_current_user
from backend.emails import email_sending


router = APIRouter(prefix="/contests", tags=["Contests"])


class Contest(BaseModel):
    name: str
    description: str
    category: str
    entryCategories: list[str]
    published: bool
    deadline: datetime
    termsAndConditions: list[AnyHttpUrl]
    acceptedFileFormats: list[str]
    background: AnyHttpUrl


@router.post('/')
async def post_contest(
    data: Contest,
    request: Request,
    user_id: str = Depends(get_current_user)
):
    db = request.app.database

    entry_dict = data.model_dump(mode="json")
    inserted_id = (await db.contests.insert_one(entry_dict)).inserted_id

    return {"id": str(inserted_id)}


@router.get(
    "/", responses={404: {"description": "Contest with given id not found"}}
)
async def get_contests(
    request: Request,
    id: Optional[str] = None
):
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
        with open(file_name, "r") as file:
            receivers.extend([line.rstrip() for line in file])
    return receivers


def send_emails(data: Publication):
    receivers = get_all_receivers(data.receiver_files)
    email_body = f"{data.form_url}"
    email_sending.send_email(receivers, "Subject", email_body)


async def update_contest(db, id):
    await db.contests.update_one(
        {"_id": ObjectId(id)}, {"$set": {"published": True}}
    )


@router.post("/{id}/publish")
async def publish_contest(request: Request, data: Publication, id: str):
    send_emails(data)
    db = request.app.database
    await update_contest(db, id)
