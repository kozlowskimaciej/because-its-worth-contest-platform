from email.message import EmailMessage
from smtplib import SMTP
import os

LOGIN = "contest.platform1@gmail.com"


def send_email(receiver, subject, body):
    password = os.getenv("EMAIL_PASSWORD", None)
    if not password:
        raise KeyError("Password not provided")

    server = SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.ehlo()
    server.login(LOGIN, password)

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = LOGIN
    msg["To"] = receiver
    msg.set_content(body)

    server.send_message(msg)
    server.quit()
