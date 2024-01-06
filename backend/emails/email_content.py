class EmailContentGenerator:
    @staticmethod
    def generate_contest_invitation(contest_name, deadline, form_url):
        subject = "Zaproszenie do udziału w konkursie"
        body = (
            f"Szanowni Państwo, \n\
            zapraszamy do wzięcia udziału w konkursie {contest_name},\
            którego termin zgłoszeń upływa do końca dnia {deadline}. \n\
            Link z formularzem do wysłania zgłoszenia:\n\
            {form_url} \n\
            Z poważaniem, \n\
            Fundacja"
        )
        return (subject, body)
