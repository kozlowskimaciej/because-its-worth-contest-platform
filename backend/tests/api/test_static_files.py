import os
from pathlib import Path

import pytest


TEST_IMAGES_PATH = Path(__file__).parent.parent / "test_images"


@pytest.fixture(autouse=True)
def mock_static_files_dir(monkeypatch, testdir):
    from backend.api.routers import static_files
    monkeypatch.setattr(static_files, "STATIC_FOLDER_NAME", str(testdir))


def test_upload_valid_file(client):
    file_path = TEST_IMAGES_PATH / 'valid_file.jpg'
    with open(file_path, 'rb') as file:
        files = {'file': ('valid_file.jpg', file, 'image/jpeg')}
        file_size = os.path.getsize(file_path)
        print(file_size)
        response = client.post('/uploads/', files=files)

    assert response.status_code == 200

    uploaded_file = response.json()
    assert uploaded_file["size"] > 0

    # Access the uploaded file using the static path
    response = client.get(f"/static/{uploaded_file['filename']}")

    # Assert the access response
    assert response.status_code == 200
    assert response.headers['content-type'] == 'image/jpeg'
    assert response.content == file_path.read_bytes()


def test_upload_invalid_file_size(client):
    file_path = TEST_IMAGES_PATH / 'too_big_file.png'
    with open(file_path, 'rb') as file:
        files = {'file': ('too_big_file.png', file, 'image/png')}
        response = client.post('/uploads', files=files)

    assert response.status_code == 413
    assert 'File size is too large' in response.json()['detail']


def test_upload_invalid_file_format(client):
    file_path = TEST_IMAGES_PATH / 'invalid_format.pdf'
    with open(file_path, 'rb') as file:
        files = {'file': ('invalid_format.pdf', file, 'image/jpeg')}
        response = client.post('/uploads/', files=files)

    assert response.status_code == 400
    assert 'Invalid file format' in response.json()['detail']
