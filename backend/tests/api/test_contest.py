from datetime import datetime
from backend.api.routers.auth import create_jwt_token


def test_post_contest(client):
    token = create_jwt_token({"id": "d19ffe4b-d2e1-43d9-8679-c8a21309ac22"})

    contest = {
        'name': 'Test Contest',
        'description': 'This is a test contest.',
        'category': 'Test',
        'entryCategories': ['foo', 'boo', 'bar'],
        'published': True,
        'deadline': datetime.now().isoformat(),
        'termsAndConditions': [
            'https://foo.bar/static/contest-terms1.jpg',
            'https://foo.bar/static/contest-terms2.jpg'
        ],
        'acceptedFileFormats': ['jpg', 'png'],
        'background': 'https://foo.bar/static/contest-background.jpg',
    }

    response = client.post(
        '/contests/',
        json=contest,
        cookies={"token": token}
    )
    assert response.status_code == 200

    post_resp = response.json()
    assert 'id' in post_resp
    contest_id = post_resp['id']

    response = client.get(f'/contests?id={contest_id}')
    assert response.status_code == 200

    get_resp = response.json()
    assert 'data' in get_resp

    resp_data = get_resp['data']
    assert resp_data['_id']['$oid'] == contest_id
    assert resp_data['name'] == contest['name']
    assert resp_data['description'] == contest['description']
    assert resp_data['category'] == contest['category']
    assert resp_data['entryCategories'] == contest['entryCategories']
    assert resp_data['published'] == contest['published']
    assert resp_data['deadline'] == contest['deadline']
    assert resp_data['termsAndConditions'] == contest['termsAndConditions']
    assert resp_data['acceptedFileFormats'] == contest['acceptedFileFormats']
    assert resp_data['background'] == contest['background']

    response = client.get('/contests/')
    assert response.status_code == 200

    get_all_resp = response.json()
    assert 'data' in get_all_resp
    assert len(get_all_resp['data']) == 1
    assert get_all_resp['data'][0] == resp_data
