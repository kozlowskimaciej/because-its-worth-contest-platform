from pathlib import Path
import uuid
import datetime
import os
from urllib.parse import quote
import re

from fastapi import File, UploadFile, HTTPException, APIRouter


ALLOWED_EXTENSIONS = {"mp3", "mp4", "wav", "jpg", "jpeg", "png", "svg", "pdf",
                      "docx", "txt"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
STATIC_FOLDER_NAME = Path(__file__).parent.parent.parent / "uploads"

# API path for post
router = APIRouter(prefix='/uploads', tags=['Upload'])


def generate_filename(user_id, original_filename):
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    random_string = str(uuid.uuid4().hex)[:8]
    cleaned_filename = re.sub(r"%..", "_", quote(original_filename))
    return f"{user_id}_{timestamp}_{random_string}_{cleaned_filename}"


def __allowed_file(filename):
    # Check file extension existence
    if '.' not in filename:
        return False

    # Ensure the filename doesn't contain directory traversal attempts
    normalized_path = os.path.normpath(filename)
    if normalized_path != filename or normalized_path.startswith(".."):
        return False

    # Check file extension name
    _, file_extension = os.path.splitext(filename)
    return file_extension[1:].lower() in ALLOWED_EXTENSIONS


def __validate_file_size(file: UploadFile):
    if file.size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,  # Request entity too large
            detail=f"File size is too large. Max allowed size is \
                {MAX_FILE_SIZE}MB."
        )


def __validate_file_name(file: UploadFile):
    if not __allowed_file(file.filename):
        raise HTTPException(
            status_code=400,
            detail="Invalid file format. Allowed formats: JPG, PNG, MP4."
        )


def validate_file(file: UploadFile):
    __validate_file_size(file)
    __validate_file_name(file)


@router.post('/')
async def upload_file(file: UploadFile = File(...)):
    user_id = 123  # mockup - need to fetch dynamically
    generated_filename = generate_filename(user_id, file.filename)

    # Validate file
    validate_file(file)

    # Save file to STATIC_FOLDER_NAME path
    filepath = STATIC_FOLDER_NAME / generated_filename
    with open(filepath, "wb") as f:
        f.write(file.file.read())

    return {"filename": generated_filename, "size": file.size}


@router.delete('/{filename}')
async def delete_file(filename: str):
    filepath = STATIC_FOLDER_NAME / filename

    if os.path.exists(filepath):
        os.remove(filepath)
        return {"message": "File deleted successfully"}
    else:
        raise HTTPException(
            status_code=404,
            detail=f"File {filepath} not found"
        )
