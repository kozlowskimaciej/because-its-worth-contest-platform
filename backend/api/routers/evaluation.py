from starlette.requests import Request
from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson.objectid import ObjectId


router = APIRouter(prefix="/evaluation", tags=["Evaluation"])


@router.post("/")
async def evaluation(request: Request):
    db: AsyncIOMotorDatabase = request.app.database
    evaluations = await request.json()

    modified_count = 0
    for e in evaluations:
        result = await db.entries.update_one(
            {"_id": ObjectId(e["entryId"])}, {"$set": {"place": e["value"]}}
        )
        modified_count += result.modified_count

    if len(evaluations) != modified_count:
        raise HTTPException(
            status_code=500, detail=f"Updated {modified_count} entries only"
        )
    return {"modifiedCount": modified_count}
