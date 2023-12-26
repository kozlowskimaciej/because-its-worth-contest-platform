from fastapi import APIRouter, Request, HTTPException, Depends

from fastapi.responses import JSONResponse
from jose import jwt
from datetime import datetime, timedelta

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

SECRET_KEY = "iudgsfuyguyerwhgyw"

ALGORITHM = "HS256"


def create_jwt_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=7)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


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

    response = JSONResponse(content={"token": access_token})
    header = "Access-Control-Allow-Origin"
    response.headers[header] = request.headers.get("Origin", "*")
    response.set_cookie(key="token", value=access_token, secure=True,
                        httponly=True, samesite="none")

    return response


def get_current_user(request: Request):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        token = request.cookies.get("token")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id: str = payload.get("id")
        if id is None:
            raise credentials_exception
    except Exception:
        raise credentials_exception
    return id


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

    response = JSONResponse(content={})
    header = "Access-Control-Allow-Origin"
    response.headers[header] = request.headers.get("Origin", "*")
    response.set_cookie(key="token", value=access_token, secure=True,
                        httponly=True, samesite="none")

    return response


@router.post("/logout")
async def logout(
    request: Request,
    response: JSONResponse,
    user_id: str = Depends(get_current_user)
  ):
    header = "Access-Control-Allow-Origin"
    response.headers[header] = request.headers.get("Origin", "*")
    response.delete_cookie(key="token", secure=True, httponly=True,
                           samesite="none")
    return {
        "message": "successful logout"
    }


@router.post("/signup")
async def signup(request: Request):
    data = await request.form()

    login = data.get("login")
    password = data.get("password")

    if not login or not password:
        raise HTTPException(status_code=400,
                            detail="Login and password are required")

    from random import randint

    id = str(randint(10 ** 5, 10 ** 6))
    created_user = {
        "id": id,
        "name": login,
        "login": login,
        "password": password
    }

    users.append(created_user)

    token_data = {
        "id": id
    }
    access_token = create_jwt_token(token_data)

    response = JSONResponse(content={"id": id})
    response.set_cookie(key="token", value=access_token, httponly=True,
                        samesite=None)

    return response
