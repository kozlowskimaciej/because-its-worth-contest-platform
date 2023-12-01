from fastapi import FastAPI
from api.routers import hello, static_files


def create_app():
    app = FastAPI()

    # including routers
    app.include_router(hello.router)
    app.include_router(static_files.router)

    # static files are available under /uploads path
    app.mount("/uploads", static_files.static_router, name="uploads")

    return app

if __name__ == '__main__':
    create_app()
