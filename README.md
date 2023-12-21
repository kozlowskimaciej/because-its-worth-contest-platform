# Because It's⚘Worth Contest Platform

## Cel projektu

Celem projektu jest stworzenie platformy konkursowej na stronie internetowej, umożliwiającej organizatorom Fundacji skuteczne zarządzanie konkursami. Platforma ma wspierać generowanie formularzy zgłoszeniowych, zarządzanie informacjami o uczestnikach i ich pracach, oraz automatyzację procesów komunikacyjnych poprzez wysyłanie maili z informacjami o nadchodzących konkursach, zakończeniu konkursów oraz zaproszeniami dla laureatów.

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

### Fetching contests

API request prototype for fetching contests

```plaintext
http://localhost:8000/contests
```

API response prototype for fetching contests

```json
{
  "data": [
    {
      "_id": {
        "$oid": "657e1e85d9a591885cd7a032"
      },
      "name": "Test Contest",
      "description": "This is a test contest.",
      "category": "Test",
      "entryCategories": ["foo", "boo", "bar"],
      "published": true,
      "deadline": "2021-09-01T00:00:00Z",
      "termsAndConditions": [
        "https://foo.bar/static/contest-terms1.jpg",
        "https://foo.bar/static/contest-terms2.jpg"
      ],
      "acceptedFileFormats": ["jpg", "png"],
      "background": "https://foo.bar/static/contest-background.jpg"
    },
    {
      "_id": {
        "$oid": "657e2152d9a591885cd7a033"
      },
      "name": "Test Contest",
      "description": "This is a test contest.",
      "category": "Test",
      "entryCategories": ["foo", "boo", "bar"],
      "published": true,
      "deadline": "2021-09-01T00:00:00Z",
      "termsAndConditions": [
        "https://foo.bar/static/contest-terms1.jpg",
        "https://foo.bar/static/contest-terms2.jpg"
      ],
      "acceptedFileFormats": ["jpg", "png"],
      "background": "https://foo.bar/static/contest-background.jpg"
    }
  ]
}
```

### Fetching competition entries

API request prototype for fetching competition entries

```plaintext
http://localhost:8000/entries/657e2152d9a591885cd7a033
```

API response prototype for fetching competition entries

```json
{
  "data": [
    {
      "_id": {
        "$oid": "657ef4a4c4d16a709a994e1f"
      },
      "firstName": "Elon",
      "lastName": "Musk",
      "guardianFirstName": "Nie",
      "guardianLastName": "istnieje",
      "phone": "694202137",
      "email": "someemail@email.com",
      "address": "Starbase, Texas",
      "submissionDate": "2023-12-17T13:16:20.107Z",
      "attachments": [],
      "place": "none",
      "contestId": "657ed098a5ba96cfdd2b3d42"
    },
    {
      "_id": {
        "$oid": "657ef4dbc4d16a709a994e20"
      },
      "firstName": "Elon",
      "lastName": "Musk",
      "guardianFirstName": "Nie",
      "guardianLastName": "istnieje",
      "phone": "694202137",
      "email": "someemail@email.com",
      "address": "Starbase, Texas",
      "submissionDate": "2023-12-17T13:17:15.961Z",
      "attachments": [],
      "place": "none",
      "contestId": "657ed098a5ba96cfdd2b3d42"
    }
  ]
}
```

### Publishing contest

```plaintext
http://localhost:8000/contests/657ef4a4c4d16a709a994e1f/publish
```

Api request prototype for publishing contest

```json
{
  "receiver_files": [
    "emails.txt",
    "receivers.txt",
    "contestants.txt"
  ],
  "form_url": "https://foo.bar/forms/657ed098a5ba96cfdd2b3d42",
}
```
