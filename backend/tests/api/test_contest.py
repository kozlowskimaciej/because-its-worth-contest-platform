from datetime import datetime


def test_post_contest(client):
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

    response = client.post('/contests/', json=contest)
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
