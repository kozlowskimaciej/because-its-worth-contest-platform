import pytest
from bson.objectid import ObjectId


@pytest.fixture
def insert_example_entry(db):
    entry_doc = {
        "firstName": "Sebastian",
        "lastName": "Wiadro",
        "guardianFirstName": "Sebastian",
        "guardianLastName": "Senior",
    }

    id = db["entries"].insert_one(entry_doc.copy()).inserted_id
    return id


def test_evaluation(client, insert_example_entry: ObjectId):
    id = insert_example_entry
    evaluation = [{"value": "laureat", "entryId": str(id)}]
    response = client.post("/evaluation/", json=evaluation)

    assert response.status_code == 200
    assert response.json() == {"modifiedCount": 1}
