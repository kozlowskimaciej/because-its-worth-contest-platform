import json
from datetime import datetime
from typing import Optional

from bson import ObjectId, json_util
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, AnyHttpUrl
from starlette.requests import Request
from backend.emails.email_sending import send_email


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


@router.post("/")
async def post_contest(data: Contest, request: Request):
    db = request.app.database

    entry_dict = data.model_dump(mode="json")
    inserted_id = (await db.contests.insert_one(entry_dict)).inserted_id

    return {"id": str(inserted_id)}


@router.get(
    "/", responses={404: {"description": "Contest with given id not found"}}
)
async def get_contests(
    request: Request,
    id: Optional[str] = None,
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
    form_url: AnyHttpUrl


@router.post("/{id}/publish")
async def publish_contest(request: Request, id: str = None):
    send_email("maciej@kozlo.pb.bi.bmw", "Subject", "Body")

    db = request.app.database
    await db.contests.update_one(
        {"_id": ObjectId(id)}, {"$set": {"published": True}}
    )
