from pathlib import Path

from testcontainers.mongodb import MongoDbContainer
from pymongo.database import Database
import pytest


@pytest.fixture(scope="session")
def mongodb_container():
    with MongoDbContainer() as mongo:
        yield mongo


@pytest.fixture
def db(request, mongodb_container) -> Database:
    client = mongodb_container.get_connection_client()
    return getattr(client, request.node.name)


@pytest.fixture(autouse=True)
def testdir(monkeypatch, tmpdir) -> Path:
    print(tmpdir)
    monkeypatch.chdir(tmpdir)
    return tmpdir
