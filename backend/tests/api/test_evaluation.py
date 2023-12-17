from datetime import datetime


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

    evaluation = [{"value": "laureat", "entryId": entry_id}]
    response = client.post("/evaluation/", json=evaluation)
    assert response.status_code == 200
    assert response.json() == {"modifiedCount": 1}

    response = client.get(f"/entries/{contest_id}?entryId={entry_id}")
    assert response.status_code == 200
    assert response.json()["data"]["place"] == "laureat"
