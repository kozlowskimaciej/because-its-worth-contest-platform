import json
import os
from datetime import datetime
from typing import List, Optional
from urllib.parse import urlparse
from bson import ObjectId, json_util
from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from pydantic import AnyHttpUrl, BaseModel
from starlette.requests import Request

from backend.api.routers.auth import get_current_user

from .static_files import delete_file

router = APIRouter(prefix="/entries", tags=["Entries"])


class Entry(BaseModel):
    firstName: str
    lastName: str
    guardianFirstName: Optional[str]
    guardianLastName: Optional[str]
    phone: Optional[str]
    email: str
    address: Optional[str]
    submissionDate: datetime
    attachments: List[AnyHttpUrl]
    place: str
    contestId: str
    category: str


@router.get("/{contestId}")
async def get_entries(
    request: Request,
    contestId: str,
    entryId: Optional[str] = None,
    user_id: str = Depends(get_current_user)
):
    db = request.app.database
    if entryId:
        entry_id_obj = ObjectId(entryId)
        entry = await db.entries.find_one(
            {"_id": entry_id_obj, "contestId": contestId}
        )

        if entry:
            return {"data": json.loads(json_util.dumps(entry))}
        else:
            raise HTTPException(
                status_code=404, detail=f"Entry {entryId} not found"
            )
    else:
        entries = await db.entries.find({"contestId": contestId}).to_list(
            length=None
        )

        return {"data": json.loads(json_util.dumps(entries))}


class Evaluation(BaseModel):
    value: str


@router.post("/{entry_id}/evaluation")
async def evaluation(request: Request, entry_id: str, evaluation: Evaluation,
                     user_id: str = Depends(get_current_user)):
    db: AsyncIOMotorDatabase = request.app.database
    evaluation_dict = evaluation.model_dump(mode="json")

    result = await db.entries.update_one(
        {"_id": ObjectId(entry_id)},
        {"$set": {"place": evaluation_dict["value"]}},
    )
    modified_count = result.modified_count

    if modified_count != 1:
        raise HTTPException(
            status_code=500,
            detail=f"Invalid number of updated entries: {modified_count}",
        )
    return {"modifiedCount": modified_count}


@router.post("/")
async def create_entry(entry: Entry, request: Request):
    db = request.app.database

    contestId = entry.contestId
    contest = await db.contests.find_one({'_id': ObjectId(contestId)})

    if not contest.get("published"):
        raise HTTPException(
            status_code=400, detail=f"Contest {contestId} is not published."
        )

    validate_submission_deadline(entry.submissionDate, contest.get("deadline"))

    entry_dict = entry.model_dump(mode="json")
    inserted_id = (await db.entries.insert_one(entry_dict)).inserted_id
    return {'id': str(inserted_id)}


def validate_submission_deadline(submission: datetime, deadline: str):
    if submission > datetime.fromisoformat(deadline):
        raise HTTPException(
            status_code=400,
            detail=f"Submission date {submission} is \
                     after the deadline {deadline}."
        )


@router.delete('/{entryId}')
async def delete_entry(
    request: Request,
    entryId: str,
    user_id: str = Depends(get_current_user)
):
    db = request.app.database

    entry = await db.entries.find_one({'_id': ObjectId(entryId)})
    if not entry:
        raise HTTPException(
            status_code=404,
            detail=f"Entry {entryId} not found")

    _ = await db.entries.delete_one({'_id': ObjectId(entryId)})

    if not _:
        raise HTTPException(
            status_code=404,
            detail="Something is wrong")

    attachments = entry.get("attachments", [])
    if attachments:
        for attachment_url in attachments:
            attachment_filename = os.path.basename(
                urlparse(attachment_url).path
            )
            await delete_file(attachment_filename)

    return {'id': entryId}
