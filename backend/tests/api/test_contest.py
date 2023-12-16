def test_post_contest(client):
    contest = {
        'name': 'Test Contest',
        'description': 'This is a test contest.',
        'category': 'Test',
        'entryCategories': ['foo', 'boo', 'bar'],
        'published': True,
        'deadline': '2021-09-01T00:00:00.000Z',
        'termsAndConditions': [
            'https://foo.bar/static/contest-terms1.jpg',
            'https://foo.bar/static/contest-terms2.jpg'
        ],
        'acceptedFileFormats': ['jpg', 'png'],
        'background': 'https://foo.bar/static/contest-background.jpg',
    }

    response = client.post('/contests/')
    assert response.status_code == 200

    data = response.json()
    assert 'id' in data

    contest_id = data['id']
    response = client.get(f'/contests/{contest_id}')
    assert response.status_code == 200
    data = response.json()
    assert data['name'] == contest['name']
    assert data['description'] == contest['description']
    assert data['category'] == contest['category']
    assert data['entryCategories'] == contest['entryCategories']
    assert data['published'] == contest['published']
    assert data['deadline'] == contest['deadline']
    assert data['termsAndConditions'] == contest['termsAndConditions']
    assert data['acceptedFileFormats'] == contest['acceptedFileFormats']
    assert data['background'] == contest['background']
