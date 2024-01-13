from pathlib import Path
from fastapi.testclient import TestClient

from testcontainers.mongodb import MongoDbContainer
import pytest

from backend.emails import email_sending
from smtplib import SMTP
from pytest import MonkeyPatch

import secrets
import hashlib
from backend.api.routers.auth import users, create_jwt_token


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
    monkeypatch.setattr(app, "STATIC_FOLDER_NAME", str(testdir))
    monkeypatch.setattr(static_files, "STATIC_FOLDER_NAME", str(testdir))

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


@pytest.fixture
def mock_smtp(monkeypatch: MonkeyPatch):
    mail_registry = []

    class FakeSMTP(SMTP):
        def login(self, user, password):
            pass

        def send_message(self, msg):
            mail_registry.append(msg)

    monkeypatch.setattr(email_sending, "SMTP", FakeSMTP)
    monkeypatch.setenv("EMAIL_PASSWORD", "PASSWORD")
    return mail_registry


@pytest.fixture
def setup_users():
    new_id = secrets.token_hex(16)
    new_login = "fake_login"
    new_password = secrets.token_hex(16)

    new_user = {
        "id": new_id,
        "login": new_login,
        "password": hashlib.sha256(new_password.encode()).hexdigest()
    }

    correct_user = {
        "login": new_login,
        "password": new_password
    }

    users.append(new_user)

    token = create_jwt_token({"id": new_id})

    auth_header = {
        "Authorization": f"Bearer {token}"
    }

    return correct_user, auth_header
