from pathlib import Path
from fastapi.testclient import TestClient

from testcontainers.mongodb import MongoDbContainer
import pytest


TEST_DIR = Path(__file__).parent


@pytest.fixture(scope="session")
def mongodb_container():
    with MongoDbContainer() as mongo:
        yield mongo


@pytest.fixture
def db(request, mongodb_container):
    client = mongodb_container.get_connection_client()
    return getattr(client, request.node.name)


@pytest.fixture(autouse=True)
def testdir(monkeypatch, tmpdir) -> Path:
    print(tmpdir)
    monkeypatch.chdir(tmpdir)
    return tmpdir


@pytest.fixture
def client(request, monkeypatch, mongodb_container, testdir) -> TestClient:
    from backend.api import app
    from backend.api.app import create_app, Database
    from backend.api.routers import static_files

    # setting static folder path to testdir
    monkeypatch.setattr(
        app, "STATIC_FOLDER_NAME", str(testdir))
    monkeypatch.setattr(
        static_files, "STATIC_FOLDER_NAME", str(testdir))

    # setting database connection url
    monkeypatch.setenv(
        "DB_CONNECTION_URL", mongodb_container.get_connection_url()
    )
    monkeypatch.setattr(
        Database, "get_instance_name", lambda _: request.node.name
    )

    app = create_app()
    with TestClient(app) as testclient:
        yield testclient
