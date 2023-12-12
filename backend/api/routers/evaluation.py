from fastapi import APIRouter


router = APIRouter(prefix="/evaluation", tags=["Evaluate"])


@router.get("/")
async def evaluation():
    return {"msg": "22"}
