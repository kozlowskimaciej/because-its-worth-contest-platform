from email.message import EmailMessage
import smtplib
import os

LOGIN = "contest.platform1@gmail.com"


def send_email(receiver, subject, body):
    password = os.getenv("PASSWORD", None)
    if not password:
        raise KeyError("Password not provided")

    server = smtplib.SMTP("smtp.gmail.com", 587)
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
