def test_login(client, setup_users):
    incorrect_user = {
        "login": "incorrect_login",
        "password": "incorrect_password"
    }

    correct_user, _ = setup_users

    response = client.post("/auth/login", json=incorrect_user)
    assert response.status_code == 401

    response = client.post("/auth/login", json=correct_user)
    assert response.status_code == 200
    assert "token" in response.cookies
    assert "token" in response.json()


def test_refresh(client, setup_users):
    _, auth_header = setup_users

    response = client.post("/auth/refresh", headers=auth_header)
    assert response.status_code == 200
    assert "token" in response.cookies
    assert "token" in response.json()


def test_logout(client, setup_users):
    correct_user, auth_header = setup_users

    response = client.post("/auth/login", json=correct_user)
    assert response.status_code == 200

    response = client.post("auth/logout", headers=auth_header)
    assert response.status_code == 200
    assert "token" in response.cookies
