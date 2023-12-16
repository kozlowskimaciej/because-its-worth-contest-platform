from fastapi import APIRouter, HTTPException
from starlette.requests import Request
from pydantic import BaseModel
from typing import List, Optional
from bson import ObjectId


MAX_ENTRIES_NUM = 100

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
    attachments: List[str] = []
    place: str
    contestId: str


def deserialize_entry(entry):
    # Assuming entry is a MongoDB object
    entry_data = {
        '_id': str(entry['_id']),
        'firstName': entry['firstName'],
        'lastName': entry['lastName'],
        'guardianFirstName': entry['guardianFirstName'],
        'guardianLastName': entry['guardianLastName'],
        'phone': entry['phone'],
        'email': entry['email'],
        'address': entry['address'],
        'submissionDate': entry['submissionDate'],
        'attachments': entry['attachments'],
        'place': entry['place'],
        'contestId': entry['contestId']
    }
    return entry_data


@router.get(
    '/',
    responses={404: {'description': 'Contest with given id not found'}})
async def list_entries(request: Request, contestId: str):
    db = request.app.database
    entries = await db.entries.find({'contestId': contestId}) \
        .to_list(length=MAX_ENTRIES_NUM)

    # Convert ObjectId to string for JSON serialization
    entries_data = [
        {**entry, '_id': str(entry['_id'])} if isinstance(
            entry.get('_id'), ObjectId) else entry
        for entry in entries
    ]
    return entries_data


@router.get('/{contestId}')
async def get_entry(
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
            entry_data = deserialize_entry(entry)
            return entry_data
        else:
            raise HTTPException(status_code=404,
                                detail=f"Entry {entryId} not found")
    else:
        entries_data = await db.entries.find({'contestId': contestId}) \
            .to_list(length=MAX_ENTRIES_NUM)
        entries = [{**entry, '_id': str(entry['_id'])} if isinstance(
            entry.get('_id'), ObjectId) else entry for entry in entries_data
                    ]
        return entries


@router.post('/')
async def create_entry(entry: Entry, request: Request):
    db = request.app.database
    entry_dict = entry.model_dump()
    inserted_id = (await db.entries.insert_one(entry_dict)).inserted_id
    return {'Entry id': str(inserted_id)}
