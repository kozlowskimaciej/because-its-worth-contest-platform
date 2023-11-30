import React from "react";
import styles from "./styles/NotFoundInfo.module.css";
import { useNavigate } from "react-router-dom";

export default function NotFoundInfo() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.image}
        src={`${process.env.PUBLIC_URL}/images/logo.jpg`}
      />
      <p className={styles.p}>Podana strona nie istnieje.</p>
      <button className={styles.button} onClick={() => navigate("/")}>
        wróć na stronę główną
      </button>
    </div>
  );
}
