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

API response for contest prototype

```json
{
  "data": [
    {
      "id": "1",
      "type": "contests",
      "attributes": {
        "title": "bardzo warto",
        "description": "Zaprawdę zaprawdę powiadam wam, nie warto."
      }
    },
    {
      "id": "2",
      "type": "contests",
      "attributes": {
        "title": "No nie wiem czy warto",
        "description": "Czy warto czy nie warto, oto jest pytanie. Dziwne są te historie za przeproszeniem."
      }
    }
  ]
}
```
