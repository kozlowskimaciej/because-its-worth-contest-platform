from fastapi import APIRouter, Request, HTTPException, Depends

from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

users = [
    {
        "id": "d19ffe4b-d2e1-43d9-8679-c8a21309ac22",
        "login": "login1",
        "password": "pass1",
    },
    {
        "id": "048358e2-42bf-4c1b-9569-7301902c11c7",
        "login": "login2",
        "password": "pass2",
    },
]

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET", None)
if not SECRET_KEY:
    raise JWTError("JWT secret has to be given.")

ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

ip_token_storage = {}


def create_jwt_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=7)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id: str = payload.get("id")
        if id is None:
            raise credentials_exception
    except Exception:
        raise credentials_exception
    return id


router = APIRouter(
    prefix='/auth',
    tags=['Auth']
)


@router.post("/login")
async def login(request: Request):
    data = await request.json()

    login = data.get("login")
    password = data.get("password")

    if not login or not password:
        raise HTTPException(status_code=400,
                            detail="Login and password are required")

    found_user = None
    for user in users:
        if login == user["login"] and password == user["password"]:
            found_user = user
            break

    if not found_user:
        raise HTTPException(status_code=401)

    token_data = {
        "id": found_user["id"]
    }
    access_token = create_jwt_token(token_data)

    ip_address = request.client.host
    ip_token_storage[ip_address] = access_token

    response = JSONResponse(content={"token": access_token})

    return response


@router.post("/refresh")
async def refresh(
    request: Request,
    response: JSONResponse,
    user_id: str = Depends(get_current_user)
):
    token_data = {
        "id": user_id
    }
    access_token = create_jwt_token(token_data)

    ip_address = request.client.host
    try:
        ip_token_storage[ip_address] = access_token
    except KeyError:
        raise HTTPException(status_code=401, detail="No saved token.")

    response = JSONResponse(content={"token": access_token})

    return response


@router.get("/init")
async def init(request: Request):
    ip_address = request.client.host
    try:
        access_token = ip_token_storage[ip_address]
    except KeyError:
        raise HTTPException(status_code=401, detail="No saved token.")

    response = JSONResponse(content={"token": access_token})

    return response


@router.post("/logout")
async def logout(request: Request, user_id: str = Depends(get_current_user)):
    ip_address = request.client.host
    try:
        del ip_token_storage[ip_address]
    except KeyError:
        raise HTTPException(status_code=401, detail="No saved token.")

    response = JSONResponse(content={"message": "Logged out successfully."})

    return response
