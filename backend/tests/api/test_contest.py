from datetime import datetime, timedelta
from backend.tests.api.test_static_files import TEST_IMAGES_PATH
from email.message import EmailMessage
from backend.api.routers.auth import create_jwt_token
from backend.emails.email_content import EmailContentGenerator

import pytest


token = create_jwt_token({"id": "d19ffe4b-d2e1-43d9-8679-c8a21309ac22"})

auth_cookie = {
    "token": token
}


@pytest.fixture
def contest():
    return {
        "name": "Test Contest",
        "description": "This is a test contest.",
        "category": "Test",
        "entryCategories": ["foo", "boo", "bar"],
        "published": False,
        "ended": False,
        "deadline": str((datetime.now() + timedelta(hours=1)).isoformat()),
        "termsAndConditions": [
            "https://foo.bar/static/contest-terms1.jpg",
            "https://foo.bar/static/contest-terms2.jpg",
        ],
        "acceptedFileFormats": ["jpg", "png"],
        "background": "https://foo.bar/static/contest-background.jpg",
    }


def test_post_contest(client, contest):
    response = client.post("/contests/", json=contest, cookies=auth_cookie)
    assert response.status_code == 200

    post_resp = response.json()
    assert "id" in post_resp
    contest_id = post_resp["id"]

    response = client.get(f"/contests/?id={contest_id}")
    assert response.status_code == 200

    get_resp = response.json()
    assert "data" in get_resp

    resp_data = get_resp["data"]
    assert resp_data["_id"]["$oid"] == contest_id
    assert resp_data["name"] == contest["name"]
    assert resp_data["description"] == contest["description"]
    assert resp_data["category"] == contest["category"]
    assert resp_data["entryCategories"] == contest["entryCategories"]
    assert resp_data["published"] == contest["published"]
    assert resp_data["ended"] == contest["ended"]
    assert resp_data["deadline"] == contest["deadline"]
    assert resp_data["termsAndConditions"] == contest["termsAndConditions"]
    assert resp_data["acceptedFileFormats"] == contest["acceptedFileFormats"]
    assert resp_data["background"] == contest["background"]

    response = client.get("/contests/")
    assert response.status_code == 200

    get_all_resp = response.json()
    assert "data" in get_all_resp
    assert len(get_all_resp["data"]) == 1
    assert get_all_resp["data"][0] == resp_data


def test_publish_contest(client, mock_smtp: list[EmailMessage], contest):
    response = client.post("/contests/", json=contest, cookies=auth_cookie)
    assert response.status_code == 200
    contest_id = response.json()["id"]

    assert len(mock_smtp) == 0

    response = client.get(f"/contests/?id={contest_id}")
    assert response.status_code == 200
    assert not response.json()["data"]["published"]

    file_path = TEST_IMAGES_PATH / "emails.txt"
    with open(file_path, "rb") as file:
        files = {"file": ("emails.txt", file, "image/jpeg")}
        response = client.post("/uploads/", files=files)
        file_name = response.json()["filename"]

    publishing = {
        "receiver_files": [file_name, file_name],
        "form_url": "link_to_form",
    }
    response = client.post(f"/contests/{contest_id}/publish", json=publishing,
                           cookies=auth_cookie)
    assert response.status_code == 200

    assert len(mock_smtp) == 1
    assert mock_smtp[0]["To"] == ", ".join(
        ["maciej@bmw.pb.bi", "kolega@macieja.uwb.bi"] * 2
    )

    deadline = contest["deadline"].split("T")[0]
    assert (
        mock_smtp[0].get_content().rstrip()
        == EmailContentGenerator.generate_contest_invitation(
            contest_name="Test Contest",
            deadline=datetime.strptime(deadline, "%Y-%m-%d").strftime(
                "%d.%m.%Y"
            ),
            form_url=publishing["form_url"],
        )[1].rstrip()
    )

    response = client.get(f"/contests/?id={contest_id}")
    assert response.status_code == 200
    assert response.json()["data"]["published"]


def test_end_contest(client, mock_smtp: list[EmailMessage], contest, entry):
    contest["published"] = True
    response = client.post("/contests/", json=contest, cookies=auth_cookie)
    assert response.status_code == 200
    contest_id = response.json()["id"]

    entry["contestId"] = contest_id
    response = client.post("/entries/", json=entry)
    assert response.status_code == 200

    assert len(mock_smtp) == 0

    response = client.post(f"/contests/{contest_id}/end", cookies=auth_cookie)
    assert response.status_code == 200

    assert len(mock_smtp) == 1
    mail = mock_smtp[0]
    assert mail["To"] == "@email.com"


def test_end_contest_twice(client, mock_smtp: list[EmailMessage], contest):
    response = client.post("/contests/", json=contest, cookies=auth_cookie)
    assert response.status_code == 200
    contest_id = response.json()["id"]

    response = client.post(f"/contests/{contest_id}/end", cookies=auth_cookie)
    assert response.status_code == 200

    response = client.post(f"/contests/{contest_id}/end", cookies=auth_cookie)
    assert response.status_code == 409


def test_delete_contest(client, contest):
    contest["termsAndConditions"] = None
    contest["background"] = None
    contest["published"] = True

    response = client.post('/contests/', json=contest, cookies=auth_cookie)
    assert response.status_code == 200

    post_resp = response.json()
    assert "id" in post_resp
    contest_id = post_resp["id"]

    # adding sample entry
    response = client.post(
        "/entries/",
        json={
            "firstName": "Janusz",
            "lastName": "Kowal",
            "guardianFirstName": "Jan",
            "guardianLastName": "Janowy",
            "phone": "32423432",
            "email": "@email.com",
            "address": "jiosajd, 9023",
            "submissionDate": str(datetime.now().isoformat()),
            "attachments": [],
            "place": "Warsaw",
            "contestId": contest_id,
            "category": "kat1",
        },
    )
    assert response.status_code == 200

    response = client.get(f'/entries/{contest_id}', cookies=auth_cookie)
    assert response.status_code == 200
    entries_data = response.json()["data"]
    assert len(entries_data) == 1

    response = client.delete(f'/contests/?id={contest_id}',
                             cookies=auth_cookie)
    assert response.status_code == 200

    response = client.get(f'/entries/{contest_id}', cookies=auth_cookie)
    assert response.status_code == 200
    entries_data = response.json()["data"]
    assert len(entries_data) == 0

    response = client.get(f'/contests/?id={contest_id}')
    assert response.status_code == 404


def test_update_contest(client, contest):
    contest["termsAndConditions"] = None
    contest["background"] = None

    response = client.post('/contests/', json=contest, cookies=auth_cookie)
    assert response.status_code == 200

    post_resp = response.json()
    assert "id" in post_resp
    contest_id = post_resp["id"]

    contest['name'] = 'New name'
    response = client.patch(f'/contests/?id={contest_id}', json=contest,
                            cookies=auth_cookie)
    assert response.status_code == 200

    response = client.get(f'/contests/?id={contest_id}')
    assert response.status_code == 200

    get_resp = response.json()
    assert "data" in get_resp
    assert get_resp["data"]["name"] == "New name"
