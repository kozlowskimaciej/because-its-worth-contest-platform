from email.message import EmailMessage
from smtplib import SMTP
import os

LOGIN = "contest.platform1@gmail.com"


def send_email(receiver: list[str], email_content: tuple[str, str]):
    password = os.getenv("EMAIL_PASSWORD", None)
    if not password:
        raise KeyError("Password not provided")

    server = SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.ehlo()
    server.login(LOGIN, password)

    msg = EmailMessage()
    subject, body = email_content
    msg["Subject"] = subject
    msg["From"] = LOGIN
    msg["To"] = receiver
    msg.set_content(body)

    server.send_message(msg)
    server.quit()
