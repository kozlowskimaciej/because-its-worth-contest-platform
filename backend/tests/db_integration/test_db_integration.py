from pymongo.database import Database
import pytest


def test_mongo_insert_and_find(db: Database):
    doc = {
        "address": {
            "street": "2 Avenue",
            "zipcode": "10075",
            "building": "1480",
            "coord": [-73.9557413, 40.7720266],
        },
        "borough": "Manhattan",
        "cuisine": "Italian",
        "name": "Vella",
        "restaurant_id": "41704620",
    }
    db.restaurants.insert_one(doc)
    cursor = db.restaurants.find({"borough": "Manhattan"})
    assert cursor.next()["restaurant_id"] == doc["restaurant_id"]


# This test uses other db instance so no data will be found
def test_mongo_no_data(db: Database):
    cursor = db.restaurants.find({"borough": "Manhattan"})
    with pytest.raises(StopIteration):
        cursor.next()["restaurant_id"]
