from datetime import datetime


def test_create_entry(client):
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
            "https://foo.bar/static/entry-picture2.jpg"
        ],
        "place": "Warsaw",
        "contestId": contest_id
    }

    response = client.post("/entries/", json=entry_data)
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
    assert resp_data['firstName'] == entry_data['firstName']
    assert resp_data['lastName'] == entry_data['lastName']
    assert resp_data['guardianFirstName'] == entry_data['guardianFirstName']
    assert resp_data['guardianLastName'] == entry_data['guardianLastName']
    assert resp_data['phone'] == entry_data['phone']
    assert resp_data['email'] == entry_data['email']
    assert resp_data['address'] == entry_data['address']
    assert resp_data['submissionDate'] == entry_data['submissionDate']
    assert resp_data['attachments'] == entry_data['attachments']
    assert resp_data['place'] == entry_data['place']
    assert resp_data['contestId'] == contest_id

    response = client.get(f"/entries/{contest_id}")
    assert response.status_code == 200
    assert "data" in response.json()
    entries_data = response.json()["data"]
    assert len(entries_data) > 0
    assert entries_data[0]["contestId"] == contest_id
