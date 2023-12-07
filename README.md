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
http://foundation.com/contests
```

API response prototype for fetching contests

```json
{
  "data": [
    {
      "id": "1",
      "type": "contests",
      "attributes": {
        "title": "bardzo warto",
        "description": "Zaprawdę zaprawdę powiadam wam, warto.",
        "status": "ongoing"
      }
    },
    {
      "id": "2",
      "type": "contests",
      "attributes": {
        "title": "Chyba będzie warto",
        "description": "Czy warto czy nie warto, oto jest pytanie. Dziwne są te historie za przeproszeniem.",
        "status": "finished"
      }
    }
  ]
}
```

### Fetching competition entries

API request prototype for fetching competition entries

```plaintext
http://foundation.com/contest/entries/?id=1
```

API response prototype for fetching competition entries

```json
{
  "data": [
    {
      "id": "1",
      "type": "entries",
      "attributes": {
        "author": {
          "id": "5",
          "attributes": {
            "firstName": "Elon",
            "lastName": "Musk",
            "phone": "123456789",
            "email": "elon.musk@gmail.com",
            "address": "Polna 2"
          }
        },
        "guardian": {
          "firstName": "Joe",
          "lastName": "Biden"
        },
        "place": "none",
        "submissionDate": "2023-04-20T18:34:59.000Z",
        "files": [
          {
            "type": "image",
            "src": "http://foundation.com/contests/13/image1.jpg"
          },
          {
            "type": "video",
            "src": "http://foundation.com/contests/13/movie1.mp4"
          },
          {
            "type": "other",
            "src": "http://foundation.com/contests/13/poem1.pdf"
          }
        ]
      }
    },
    {
      "id": "2",
      "type": "entries",
      "attributes": {
        "author": {
          "id": "5",
          "attributes": {
            "firstName": "Jan",
            "lastName": "Kowalski",
            "phone": null,
            "email": null,
            "address": null
          }
        },
        "guardian": null,
        "place": "laureat",
        "submissionDate": "2023-04-20T18:34:59.000Z",
        "files": [
          {
            "type": "image",
            "src": "http://foundation.com/contests/13/image1.jpg"
          }
        ]
      }
    }
  ]
}
```
