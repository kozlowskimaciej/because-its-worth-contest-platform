from backend.emails import email_sending


def test_send_email(mock_smtp):
    from email.message import EmailMessage

    assert len(mock_smtp) == 0
    email_sending.send_email("maciej@kozlowski.pb.bi", "Henlo", "Email body")

    assert len(mock_smtp) == 1
    msg: EmailMessage = mock_smtp[0]
    assert msg.get_content().strip() == "Email body"
    assert msg["Subject"] == "Henlo"
    assert msg["To"] == "maciej@kozlowski.pb.bi"
