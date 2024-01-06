class EmailContentGenerator:
    @staticmethod
    def generate_contest_invitation(contest_name, deadline, form_url):
        subject = "Zaproszenie do udziału w konkursie"
        body = (
            f"Szanowni Państwo, \n\
            zapraszamy do wzięcia udziału w konkursie {contest_name},\
            którego termin zgłoszeń upływa do końca dnia {deadline}. \n\
            Wejdź na stronę konkursu, aby dowiedzieć się więcej: {form_url} \n\
            Z poważaniem, \n\
            Fundacja"
        )
        return (subject, body)
