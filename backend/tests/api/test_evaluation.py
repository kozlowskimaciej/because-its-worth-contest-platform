def test_evaluation(client):
    response = client.get("/evaluation/")
    assert response.status_code == 200
    assert response.json() == {"msg": "22"}
