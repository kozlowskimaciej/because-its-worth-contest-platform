from fastapi import FastAPI

# from api.routers import hello, static_files # for development
from backend.api.routers import hello, static_files  # for testing

STATIC_FILES_PATH = "/static_files"


def create_app():
    app = FastAPI()

    # including routers
    app.include_router(hello.router)
    app.include_router(static_files.router)

    # static files are available under /static_files path
    app.mount(STATIC_FILES_PATH, static_files.static_router, name="uploading")

    return app


if __name__ == "__main__":
    create_app()
