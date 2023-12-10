import os

TEST_IMAGES_PATH = 'backend/tests/test_images/'
VALID_FILE_NAME = 'valid_file.jpg'
TOO_BIG_FILE_NAME = 'too_big_file.png'
INVALID_FORMAT_FILE_NAME = 'invalid_format.pdf'

STATIC_FILES_PATH = "/static_files/"


def test_upload_valid_file(client):
    file_path = TEST_IMAGES_PATH + VALID_FILE_NAME
    with open(file_path, 'rb') as file:
        files = {'file': (VALID_FILE_NAME, file, 'image/jpeg')}
        file_size = os.path.getsize(file_path)
        print(file_size)
        response = client.post('/uploads/', files=files)

    assert response.status_code == 200
    assert response.json() == {'filename': VALID_FILE_NAME, 'size': file_size}


def test_upload_invalid_file_size(client):
    file_path = TEST_IMAGES_PATH + TOO_BIG_FILE_NAME
    with open(file_path, 'rb') as file:
        files = {'file': (TOO_BIG_FILE_NAME, file, 'image/png')}
        response = client.post('/uploads', files=files)

    assert response.status_code == 413
    assert 'File size is too large' in response.json()['detail']


def test_upload_invalid_file_format(client):
    file_path = TEST_IMAGES_PATH + INVALID_FORMAT_FILE_NAME
    with open(file_path, 'rb') as file:
        files = {'file': (INVALID_FORMAT_FILE_NAME, file, 'image/jpeg')}
        response = client.post('/uploads/', files=files)

    assert response.status_code == 400
    assert 'Invalid file format' in response.json()['detail']


def test_access_uploaded_file(client):
    file_path = STATIC_FILES_PATH + VALID_FILE_NAME

    # Access the uploaded file using the static path
    response = client.get(file_path)

    # Assert the access response
    assert response.status_code == 200
    assert response.headers['content-type'] == 'image/jpeg'
