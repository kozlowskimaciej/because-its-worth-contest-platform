from backend.emails import email_sending


def test_send_email(mock_smtp):
    from email.message import EmailMessage

    assert len(mock_smtp) == 0
    receivers = ["maciej@bmw.pb.bi", "kolega@macieja.uwb.bi"]
    email_sending.send_email(receivers, "Subject", "Body")

    assert len(mock_smtp) == 1

    msg: EmailMessage = mock_smtp[0]
    assert msg.get_content().strip() == "Body"
    assert msg["Subject"] == "Subject"
    assert msg["To"] == "maciej@bmw.pb.bi, kolega@macieja.uwb.bi"
