from contextlib import asynccontextmanager

from fastapi import FastAPI

from backend.api.database.db import Database
from backend.api.routers import hello, static_files

STATIC_FILES_PATH = "/static_files"


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

    # static files are available under /static_files path
    app.mount(STATIC_FILES_PATH, static_files.static_router, name="uploading")

    return app


if __name__ == "__main__":
    create_app()
