from fastapi import File, UploadFile, HTTPException, APIRouter
from fastapi.staticfiles import StaticFiles
import uuid
import datetime
import os
import mimetypes
from enum import Enum

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'mp4'}
MAX_FILE_SIZE = 5 * 1024 * 1024 # 5MB
STATIC_FOLDER_NAME = "uploads"

class AllowedMimeTypes(str, Enum):
    JPEG = 'image/jpeg'
    PNG = 'image/png'
    MP4 = 'video/mp4'

    @classmethod
    def get_list(cls):
        return [type.value for type in cls]

router = APIRouter(prefix='/uploads', tags=['Upload'])


def generate_filename(user_id, original_filename):
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    random_string = str(uuid.uuid4().hex)[:8]
    return f"{user_id}_{timestamp}_{random_string}_{original_filename}"

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
            status_code=413, # Request entity too large
            detail=f"File size is too large. Max allowed size is {MAX_FILE_SIZE}MB."
        )

def __validate_file_name(file: UploadFile):
    file_extension = file.filename.split(".")[-1]
    if not __allowed_file(file.filename):
        raise HTTPException(
            status_code=400,
            detail="Invalid file format. Allowed formats: JPG, PNG, MP4."
        )

def __validate_file_type(file: UploadFile):
    # Extract primary type using mimetypes module
    primary_type, _ = mimetypes.guess_type(file.filename)
    if primary_type not in AllowedMimeTypes.get_list():
        raise HTTPException(
            status_code=400,
            detail=f"Invalid MIME type. Allowed types: {', '.join(AllowedMimeTypes)}."
    )

def validate_file(file: UploadFile):
    __validate_file_size(file)
    __validate_file_name(file)
    __validate_file_type(file)

@router.post('/')
async def upload_file(file: UploadFile = File(...)):
    user_id = 123 # mockup - need to fetch dynamically
    generated_filename = generate_filename(user_id, file.filename)

    # Validate file
    validate_file(file)

    # Save file to STATIC_FOLDER_NAME path
    filepath = f"{STATIC_FOLDER_NAME}/{generated_filename}"
    with open(filepath, "wb") as f:
        f.write(file.file.read())

    return {"filename": file.filename, "size": file.size}

static_router = StaticFiles(directory=STATIC_FOLDER_NAME)
