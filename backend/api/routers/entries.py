import json
from typing import Optional
from bson import ObjectId, json_util
from fastapi import APIRouter, HTTPException
from pydantic import AnyHttpUrl, BaseModel
from starlette.requests import Request
from urllib.parse import urlparse
from .static_files import delete_file
import os

router = APIRouter(
    prefix='/entries',
    tags=['Entries']
)


class Entry(BaseModel):
    firstName: str
    lastName: str
    guardianFirstName: str
    guardianLastName: str
    phone: str
    email: str
    address: str
    submissionDate: str
    attachments: list[AnyHttpUrl]
    place: str
    contestId: str


@router.get('/{contestId}')
async def get_entries(
    request: Request,
    contestId: str,
    entryId: Optional[str] = None
):
    db = request.app.database
    if entryId:
        entry_id_obj = ObjectId(entryId)
        entry = await db.entries.find_one(
            {'_id': entry_id_obj, 'contestId': contestId}
        )

        if entry:
            return {'data': json.loads(json_util.dumps(entry))}
        else:
            raise HTTPException(
                status_code=404,
                detail=f"Entry {entryId} not found"
            )
    else:
        entries = await db.entries.find({'contestId': contestId}) \
            .to_list(length=None)

        if not entries:
            raise HTTPException(
                status_code=404,
                detail=f"No entries found for contest id {contestId}"
            )

        return {'data': json.loads(json_util.dumps(entries))}


@router.post('/')
async def create_entry(entry: Entry, request: Request):
    db = request.app.database
    entry_dict = entry.model_dump(mode='json')
    inserted_id = (await db.entries.insert_one(entry_dict)).inserted_id
    return {'id': str(inserted_id)}


@router.delete('/{entryId}')
async def delete_entry(
    request: Request,
    entryId: str
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
