from datetime import datetime
import pytest

contest_id = "657da8091c043e6cb099e3a8"


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
            "https://foo.bar/static/entry-picture1.jpg",
            "https://foo.bar/static/entry-picture2.jpg"
        ],
        "place": "Warsaw",
        "contestId": contest_id
    }


def test_create_entry(client, entry):
    response = client.post("/entries/", json=entry)
    assert response.status_code == 200
    post_resp = response.json()

    assert "id" in post_resp
    entry_id = post_resp['id']
    response = client.get(
        f"/entries/{contest_id}?entryId={entry_id}"
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

    response = client.get(f"/entries/{contest_id}")
    assert response.status_code == 200
    assert "data" in response.json()
    entries_data = response.json()["data"]
    assert len(entries_data) > 0
    assert entries_data[0]["contestId"] == contest_id


def test_delete_entry(client, entry):
    response = client.post("/entries/", json=entry)
    assert response.status_code == 200
    post_resp = response.json()

    assert 'id' in post_resp
    entry_id = post_resp['id']
    response = client.delete(f'/entries?entryId={entry_id}')
    assert response.status_code == 200

    response = client.get(f"/entries/{contest_id}?entryId={entry_id}")
    assert response.status_code == 404
