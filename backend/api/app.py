import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from backend.api.routers.static_files import STATIC_FOLDER_NAME
from backend.api.database.db import Database
from backend.api.routers import hello, static_files, contests


@asynccontextmanager
async def lifespan(app: FastAPI):
    db_client = Database()
    app.database = await db_client.database
    yield
    await db_client.close()


def create_app():
    app = FastAPI(lifespan=lifespan)

    # including routers
    app.include_router(hello.router)
    app.include_router(static_files.router)
    app.include_router(contests.router)

    # static files are available under /static_files path
    os.makedirs(STATIC_FOLDER_NAME, exist_ok=True)
    app.mount(
        "/static", StaticFiles(directory=STATIC_FOLDER_NAME), name="uploading")

    return app


if __name__ == "__main__":
    create_app()
