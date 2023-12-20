import os
from pathlib import Path


TEST_IMAGES_PATH = Path(__file__).parent.parent / "test_images"


def test_upload_valid_file(client):
    file_path = TEST_IMAGES_PATH / 'valid_file.jpg'

    with open(file_path, 'rb') as file:
        files = {'file': ('valid_file.jpg', file, 'image/jpeg')}
        response = client.post('/uploads/', files=files)

    assert response.status_code == 200

    uploaded_file = response.json()
    assert uploaded_file["size"] == os.path.getsize(file_path)

    # Access the uploaded file using the static path
    response = client.get(f"/static/{uploaded_file['filename']}")

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
    file_path = TEST_IMAGES_PATH / 'invalid_format.bmp'
    with open(file_path, 'rb') as file:
        files = {'file': ('invalid_format.bmp', file, 'image/jpeg')}
        response = client.post('/uploads/', files=files)

    assert response.status_code == 400
    assert 'Invalid file format' in response.json()['detail']


def test_delete_file(client):
    file_path = TEST_IMAGES_PATH / 'delete_file.png'
    with open(file_path, 'rb') as file:
        files = {'file': ('delete_file.png', file, 'image/png')}
        upload_response = client.post('/uploads/', files=files)

    assert upload_response.status_code == 200

    uploaded_file = upload_response.json()
    assert 'filename' in uploaded_file

    delete_response = client.delete(f'/uploads/{uploaded_file["filename"]}')
    assert delete_response.status_code == 200
    assert delete_response.json() == {"message": "File deleted successfully"}

    access_response = client.get(f'/static/{uploaded_file["filename"]}')
    assert access_response.status_code == 404
