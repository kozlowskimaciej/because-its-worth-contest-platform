from datetime import datetime
from typing import Optional

from bson import ObjectId
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, AnyHttpUrl
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
    termsAndConditions: list[AnyHttpUrl]
    acceptedFileFormats: list[str]
    background: AnyHttpUrl


@router.post('/')
async def post_contest(
    data: Contest,
    request: Request
):
    db = request.app.database

    entry_dict = data.model_dump(mode='json')
    inserted_id = (await db.contests.insert_one(entry_dict)).inserted_id

    return {'id': str(inserted_id)}


@router.get('/{contestId}')
async def get_contests(
    request: Request,
    contestId: Optional[str] = None,
):
    db = request.app.database

    if contestId is None:
        data = await db.contests.find().to_list(length=None)
    else:
        data = await db.contests.find_one({'_id': ObjectId(contestId)})

    if not data:
        raise HTTPException(status_code=404, detail=f"{contestId=} not found")

    return {'data': data}
