import React from "react";
import styles from "./styles/ContestPreview.module.css";
import { useNavigate } from "react-router-dom";
import { Contest } from "../../models/Contest";

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
          opublikuj
        </button>
        <button className={styles.delete}>usuń konkurs</button>
      </div>
      <div className={styles.info}>
        <div>
          <h3>tytuł</h3>
          <p className={styles.entry}>{contest.name}</p>
        </div>
        <div>
          <h3>opis</h3>
          <p className={styles.entry}>{contest.description}</p>
        </div>
        <div>
          <h3>data zakończenia</h3>
          <p className={styles.entry}>{formatDate(contest.deadline)}</p>
        </div>
        <div>
          <h3>pliki z regulaminem</h3>
          <ul>
            {contest.termsAndConditions.map((file, index) => (
              <li key={index}>
                <a href={file} target="_blank">
                  {prepareFilename(file)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>kategorie</h3>
          <ul>
            {contest.categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>formaty plików</h3>
          <ul>
            {contest.acceptedFileFormats.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>formularz zgłoszeniowy</h3>
          <a href={`http://foundation.com/forms/${contest.id}`} target="_blank">
            {`http://foundation.com/forms/${contest.id}`}
          </a>
        </div>
      </div>
    </div>
  );
}
