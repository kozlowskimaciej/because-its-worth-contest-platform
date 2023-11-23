from fastapi import FastAPI

from api.routers import hello


def create_app():
    app = FastAPI()

    # including routers
    app.include_router(hello.router)

    return app

if __name__ == '__main__':
    create_app()
