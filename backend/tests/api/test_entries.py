from test_static_files import TEST_IMAGES_PATH
import pytest
from backend.api.routers.auth import create_jwt_token
from datetime import datetime, timedelta

token = create_jwt_token({"id": "d19ffe4b-d2e1-43d9-8679-c8a21309ac22"})

auth_cookie = {
    "token": token
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
        "submissionDate": str(datetime.now().isoformat()),
        "attachments": [
            "https://localhost:8000/static/delete_file.png",
        ],
        "place": "Warsaw",
        "contestId": "XYZ",
        "category": "kat1"
    }


@pytest.fixture
def contest():
    return {
        'name': 'Test Contest',
        'description': 'This is a test contest.',
        'category': 'Test',
        'entryCategories': ['foo', 'boo', 'bar'],
        'published': True,
        'deadline': str((datetime.now() + timedelta(hours=1)).isoformat()),
        'termsAndConditions': [
            'https://foo.bar/static/contest-terms1.jpg',
            'https://foo.bar/static/contest-terms2.jpg'
        ],
        'acceptedFileFormats': ['jpg', 'png'],
        'background': 'https://foo.bar/static/contest-background.jpg',
    }


def post_contest(client, contest):
    response = client.post("/contests/", json=contest, cookies=auth_cookie)
    assert response.status_code == 200

    post_resp = response.json()
    assert "id" in post_resp
    contest_id = post_resp["id"]
    return contest_id


def test_create_entry(client, entry, contest):
    contest_id = post_contest(client, contest)
    entry["contestId"] = contest_id

    response = client.post("/entries/", json=entry)
    assert response.status_code == 200
    post_resp = response.json()

    assert "id" in post_resp
    entry_id = post_resp['id']
    response = client.get(
        f"/entries/{contest_id}?entryId={entry_id}",
        cookies=auth_cookie
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
        cookies=auth_cookie
    )
    assert response.status_code == 200
    assert "data" in response.json()
    entries_data = response.json()["data"]
    assert len(entries_data) > 0
    assert entries_data[0]["contestId"] == contest_id


def test_create_entry_late_submission_date(client, entry, contest):
    late_submission_date = str((datetime.now() + timedelta(days=1)).
                               isoformat())
    entry["submissionDate"] = late_submission_date

    contest_id = post_contest(client, contest)
    entry["contestId"] = contest_id

    response = client.post("/entries/", json=entry)
    assert response.status_code == 400


def test_create_entry_contest_not_published(client, entry, contest):
    contest["published"] = False

    contest_id = post_contest(client, contest)
    entry["contestId"] = contest_id

    response = client.post("/entries/", json=entry)
    assert response.status_code == 400


def test_delete_entry(client, entry, contest):
    contest_id = post_contest(client, contest)
    entry["contestId"] = contest_id

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
        cookies=auth_cookie
    )
    assert response.status_code == 200

    del_response = client.delete(
        f'/entries/{entry_id}',
        cookies=auth_cookie
    )
    assert del_response.status_code == 200

    response = client.get(
        f"/entries/{contest_id}?entryId={entry_id}",
        cookies=auth_cookie
    )
    assert response.status_code == 404


def test_evaluation(client, entry, contest):
    contest_id = post_contest(client, contest)
    entry["contestId"] = contest_id

    response = client.post("/entries/", json=entry)
    assert response.status_code == 200
    entry_id = response.json()["id"]

    response = client.get(f"/entries/{contest_id}?entryId={entry_id}",
                          cookies=auth_cookie)
    assert response.status_code == 200
    assert response.json()["data"]["place"] == "Warsaw"

    evaluation = {"value": "laureat"}
    response = client.post(f"/entries/{entry_id}/evaluation", json=evaluation,
                           cookies=auth_cookie)
    assert response.status_code == 200
    assert response.json() == {"modifiedCount": 1}

    response = client.get(f"/entries/{contest_id}?entryId={entry_id}",
                          cookies=auth_cookie)
    assert response.status_code == 200
    assert response.json()["data"]["place"] == "laureat"
