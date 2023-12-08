import React from "react";
import styles from "./styles/ContestPreview.module.css";
import { useNavigate } from "react-router-dom";

export default function ContestPreview() {
  const navigate = useNavigate();

  const contest = {
    id: "1",
    title: "Kreatywna Eksplozja Barw",
    description: `Zapraszamy wszystkich pasjonatów sztuki i kreatywności do udziału w naszym ekscytującym konkursie "Kreatywna Eksplozja Barw". Celem konkursu jest wyrażenie swojej wyjątkowej wizji poprzez kolor i formę. Zadaniem uczestników jest stworzenie dzieła sztuki, które wyróżnia się oryginalnością, intensywnością barw oraz inspiruje do głębszych refleksji.

    Nie ma ograniczeń co do medium ani stylu artystycznego - wszelkie formy sztuki są mile widziane, od malarstwa po grafikę komputerową. Twórzcie z pasją i udowodnijcie, jak barwy mogą być nośnikiem emocji i pomysłów.
    
    Nasi cenieni sędziowie, doświadczeni w dziedzinie sztuki, ocenią prace pod kątem kreatywności, techniki, oraz przekazu artystycznego. Czekają na was nie tylko nagrody finansowe, ale także okazja do pokazania swojego talentu szerszej publiczności.
    
    Rozpocznijcie podróż przez świat kolorów i zgłoście swoje arcydzieła już dziś!`,
    date: new Date(2023, 11, 23),
    files: ["file1.pdf", "file2.pdf"],
    category: ["fotograficzny"],
    participants: ["5 - 8", "8 - 10"],
    formats: [".png", ".jpg"],
    form: "http://url.com",
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles["btn-wrapper"]}>
        <button
          className={styles.publish}
          onClick={() => navigate(`/contests/${contest.id}/publish`)}
        >
          opublikuj
        </button>
        <button className={styles.delete}>usuń konkurs</button>
      </div>
      <div className={styles.info}>
        <div>
          <h3>tytuł</h3>
          <p className={styles.entry}>{contest.title}</p>
        </div>
        <div>
          <h3>opis</h3>
          <p className={styles.entry}>{contest.description}</p>
        </div>
        <div>
          <h3>data zakończenia</h3>
          <p className={styles.entry}>{contest.date.toString()}</p>
        </div>
        <div>
          <h3>pliki</h3>
          <ul>
            {contest.files.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>kategoria</h3>
          <ul>
            {contest.category.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>kategoria wiekowa</h3>
          <ul>
            {contest.participants.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>formaty plików</h3>
          <ul>
            {contest.formats.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>formularz zgłoszeniowy</h3>
          <a href={contest.form} target="_blank">
            {contest.form}
          </a>
        </div>
      </div>
    </div>
  );
}
