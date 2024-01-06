FROM python:3

WORKDIR /contest_platform
COPY requirements.txt backend/
RUN pip install -r backend/requirements.txt

COPY . backend/

ENTRYPOINT ["uvicorn", "backend.api.app:create_app"]
CMD ["--host", "0.0.0.0", "--port", "8000", "--ssl-keyfile", "./backend/https/key.pem", "--ssl-certfile", "./backend/https/cert.pem"]
