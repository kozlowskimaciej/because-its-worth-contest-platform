from datetime import datetime
from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, HttpUrl
from starlette.requests import Request


router = APIRouter(
    prefix='/contests',
    tags=['Contests']
)


class Contest(BaseModel):
    name: str
    description: str
    category: str
    entryCategories: list[str]
    published: bool
    deadline: datetime
    termsAndConditions: list[HttpUrl]
    acceptedFileFormats: list[str]
    background: HttpUrl


@router.post('/')
async def post_contest(
    data: Contest,
    request: Request
):
    db = request.app.database

    entry_dict = data.model_dump()
    inserted_id = (await db.entries.insert_one(entry_dict)).inserted_id

    return {'id': str(inserted_id)}


@router.get('/')
async def get_contests(
    request: Request,
    contestId: Optional[int] = None,
):
    db = request.app.database

    if contestId is None:
        data = await db.contests.find().to_list(length=None)
    else:
        data = await db.contests.find_one({'id': contestId})

    if not data:
        raise HTTPException(status_code=404, detail="Contest not found")

    return {'data': data}
