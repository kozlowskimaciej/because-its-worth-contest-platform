from datetime import datetime
from test_static_files import TEST_IMAGES_PATH
import pytest
from backend.api.routers.auth import create_jwt_token

contest_id = "657da8091c043e6cb099e3a8"

token = create_jwt_token({"id": "d19ffe4b-d2e1-43d9-8679-c8a21309ac22"})

auth_header = {
    "Authorization": f"Bearer {token}"
}


@pytest.fixture
def entry():
    return {
        "firstName": "Janusz",
        "lastName": "Kowal",
        "guardianFirstName": "Jan",
        "guardianLastName": "Janowy",
        "phone": "32423432",
        "email": "@email.com",
        "address": "jiosajd, 9023",
        "submissionDate": datetime.now().isoformat(),
        "attachments": [
            "https://localhost:8000/static/delete_file.png",
        ],
        "place": "Warsaw",
        "contestId": contest_id,
    }


def test_create_entry(client, entry):
    response = client.post("/entries/", json=entry)
    assert response.status_code == 200
    post_resp = response.json()

    assert "id" in post_resp
    entry_id = post_resp['id']
    response = client.get(
        f"/entries/{contest_id}?entryId={entry_id}",
        headers=auth_header
    )
    assert response.status_code == 200
    get_resp = response.json()
    assert 'data' in get_resp

    resp_data = get_resp['data']
    assert resp_data['_id']['$oid'] == entry_id
    assert resp_data['firstName'] == entry['firstName']
    assert resp_data['lastName'] == entry['lastName']
    assert resp_data['guardianFirstName'] == entry['guardianFirstName']
    assert resp_data['guardianLastName'] == entry['guardianLastName']
    assert resp_data['phone'] == entry['phone']
    assert resp_data['email'] == entry['email']
    assert resp_data['address'] == entry['address']
    assert resp_data['submissionDate'] == entry['submissionDate']
    assert resp_data['attachments'] == entry['attachments']
    assert resp_data['place'] == entry['place']
    assert resp_data['contestId'] == contest_id

    response = client.get(
        f"/entries/{contest_id}",
        headers=auth_header
    )
    assert response.status_code == 200
    assert "data" in response.json()
    entries_data = response.json()["data"]
    assert len(entries_data) > 0
    assert entries_data[0]["contestId"] == contest_id


def test_delete_entry(client, entry):
    file_path = TEST_IMAGES_PATH / 'delete_file.png'
    with open(file_path, 'rb') as file:
        files = {'file': ('delete_file.png', file, 'image/png')}
        upload_response = client.post('/uploads/', files=files)

    assert upload_response.status_code == 200
    uploaded_filename = upload_response.json()["filename"]
    entry["attachments"] = [
        f"https://localhost:8000/static/{uploaded_filename}"
    ]

    response = client.post("/entries/", json=entry)
    assert response.status_code == 200
    post_resp = response.json()

    assert 'id' in post_resp
    entry_id = post_resp['id']

    response = client.get(
        f"/entries/{contest_id}?entryId={entry_id}",
        headers=auth_header
    )
    assert response.status_code == 200

    del_response = client.delete(
        f'/entries/{entry_id}',
        headers=auth_header
    )
    assert del_response.status_code == 200

    response = client.get(
        f"/entries/{contest_id}?entryId={entry_id}",
        headers=auth_header
    )
    assert response.status_code == 404


def test_evaluation(client):
    contest_id = "657da8091c043e6cb099e3a8"
    entry_data = {
        "firstName": "Janusz",
        "lastName": "Kowal",
        "guardianFirstName": "Jan",
        "guardianLastName": "Janowy",
        "phone": "32423432",
        "email": "@email.com",
        "address": "jiosajd, 9023",
        "submissionDate": datetime.now().isoformat(),
        "attachments": [
            "https://foo.bar/static/entry-picture1.jpg",
            "https://foo.bar/static/entry-picture2.jpg",
        ],
        "place": "Warsaw",
        "contestId": contest_id,
    }

    response = client.post("/entries/", json=entry_data)
    assert response.status_code == 200
    entry_id = response.json()["id"]

    response = client.get(f"/entries/{contest_id}?entryId={entry_id}")
    assert response.status_code == 200
    assert response.json()["data"]["place"] == "Warsaw"

    evaluation = {"value": "laureat"}
    response = client.post(f"/entries/{entry_id}/evaluation", json=evaluation)
    assert response.status_code == 200
    assert response.json() == {"modifiedCount": 1}

    response = client.get(f"/entries/{contest_id}?entryId={entry_id}")
    assert response.status_code == 200
    assert response.json()["data"]["place"] == "laureat"
