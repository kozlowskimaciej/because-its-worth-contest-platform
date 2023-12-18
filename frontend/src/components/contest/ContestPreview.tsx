import React from "react";
import styles from "./styles/ContestPreview.module.css";
import { useNavigate } from "react-router-dom";
import { Contest } from "../../models/Contest";

interface IProps {
  contest: Contest;
}

interface IProps {
  contest: Contest;
}

export default function ContestPreview({ contest }: IProps) {
  const navigate = useNavigate();

  const formatDate = (inputDate: Date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(inputDate);

    return date.toLocaleDateString("pl-PL", options as any);
  };

  const prepareFilename = (file: string): string => {
    const splitted = file.split("/");
    return splitted[splitted.length - 1];
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles["btn-wrapper"]}>
        <button
          className={styles.publish}
          onClick={() => navigate(`/contests/${contest.id}/publish`)}
        >
          Opublikuj
        </button>
        <button
          className={styles.publish}
          onClick={() => navigate(`/contests/${contest.id}/modify`)}
        >
          Modyfikuj
        </button>
        <button className={styles.delete}>Usuń konkurs</button>
      </div>
      <div className={styles.info}>
        <div>
          <h3>Tytuł</h3>
          <p className={styles.entry}>{contest.name}</p>
        </div>
        <div>
          <h3>Opis</h3>
          <p className={styles.entry} style={{ whiteSpace: "pre-wrap" }}>
            {contest.description}
          </p>
        </div>
        <div>
          <h3>Data zakończenia</h3>
          <p className={styles.entry}>{formatDate(contest.deadline)}</p>
        </div>
        <div>
          <h3>Pliki z regulaminem</h3>
          <ul style={{ overflowX: "hidden" }}>
            {contest.termsAndConditions.map((file, index) => (
              <li key={index}>
                <a href={file} target="_blank" rel="noreferrer">
                  {prepareFilename(file)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Kategoria konkursu</h3>
          <ul>
            <li>{contest.category}</li>
          </ul>
        </div>
        <div>
          <h3>Formaty plików</h3>
          <ul>
            {contest.acceptedFileFormats.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
        <div style={{ overflowX: "hidden" }}>
          <h3>Formularz zgłoszeniowy</h3>
          <a
            href={`${window.location.origin}/forms/${contest.id}`}
            target="_blank"
            rel="noreferrer"
          >
            {`${window.location.origin}/forms/${contest.id}`}
          </a>
        </div>
      </div>
    </div>
  );
}
