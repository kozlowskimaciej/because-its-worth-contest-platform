# Because It's⚘Worth Contest Platform

## API
Installing API sources in development mode
```commandline
pip install -e '.[dev]'
```
Running API
```commandline
uvicorn api.app:create_app --host 127.0.0.1 --port 8000
```
Swagger UI will be available @ http://127.0.0.1:8000/docs
