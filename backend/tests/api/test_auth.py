from backend.api.routers.auth import users, ip_token_storage, create_jwt_token
import secrets
import pytest
import hashlib


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


def test_login(client, setup_users):
    incorrect_user = {
        "login": "incorrect_login",
        "password": "incorrect_password"
    }

    correct_user, _ = setup_users

    response = client.post("/auth/login", json=incorrect_user)
    assert response.status_code == 401

    assert len(ip_token_storage) == 0

    response = client.post("/auth/login", json=correct_user)
    assert response.status_code == 200
    assert "token" in response.json()
    assert len(ip_token_storage) == 1


def test_refresh(client, setup_users):
    _, auth_header = setup_users

    response = client.post("/auth/refresh", headers=auth_header)
    assert response.status_code == 200
    assert "token" in response.json()


def test_logout(client, setup_users):
    correct_user, auth_header = setup_users

    response = client.post("/auth/login", json=correct_user)
    assert response.status_code == 200

    ips_stored = len(ip_token_storage)

    response = client.post("auth/logout", headers=auth_header)
    assert len(ip_token_storage) == ips_stored - 1


def test_init(client, setup_users):
    correct_user, auth_header = setup_users

    response = client.post("/auth/login", json=correct_user)
    assert response.status_code == 200

    response = client.get("/auth/init")
    assert response.status_code == 200
    assert "token" in response.json()

    response = client.post("/auth/logout", headers=auth_header)
    assert response.status_code == 200

    response = client.get("/auth/init")
    assert response.status_code == 401
