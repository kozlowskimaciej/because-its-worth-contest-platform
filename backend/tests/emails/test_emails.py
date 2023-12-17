from backend.emails import email_sending
import pytest
from pytest import MonkeyPatch


@pytest.fixture
def mock_smtp(monkeypatch: MonkeyPatch):
    mail_registry = []

    class FakeSMTP:
        def __init__(self, host, port) -> None:
            pass

        def starttls(self):
            pass

        def ehlo(self):
            pass

        def login(self, login, password):
            pass

        def send_message(self, msg):
            mail_registry.append(msg)

        def quit(self):
            pass

    monkeypatch.setattr(email_sending, "SMTP", FakeSMTP)
    monkeypatch.setenv("EMAIL_PASSWORD", "PASSWORD")
    return mail_registry


def test_send_email(mock_smtp):
    assert len(mock_smtp) == 0
    email_sending.send_email("maciej@kozlowski.pb.bi", "Henlo", "Email body")
    assert len(mock_smtp) == 1
