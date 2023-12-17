import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/ContestCreatedInfo.module.css";

interface IProps {
  id: string;
}

export default function ContestCreatedInfo({ id }: IProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.h4}>Konkurs stworzony pomyślnie</h4>
      <div className={styles.links}>
        <div>Formularz zgłoszeniowy dostępny pod linkiem:</div>
        <div>
          <a
            href={`${window.location.origin}/forms/${id}`}
            target="_blank"
            rel="noreferrer"
          >{`${window.location.origin}/forms/${id}`}</a>
        </div>
      </div>
      <div>
        <button
          className={styles.button}
          onClick={() => navigate(`/contests/${id}/publish`)}
        >
          opublikuj konkurs
        </button>
        <div>albo</div>
        <button className={styles.button} onClick={() => navigate("/")}>
          wróć na stronę główną
        </button>
      </div>
    </div>
  );
}
