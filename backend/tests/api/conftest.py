import pytest
from datetime import datetime


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
        "category": "kat1",
    }
