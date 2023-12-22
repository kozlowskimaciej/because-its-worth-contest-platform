import React from "react";
import styles from "./styles/SuccessfulSubmission.module.css";

export default function SuccessfulSubmission() {
  return (
    <div className={styles.wrapper}>
      <img
        className={styles.image}
        src={`${process.env.PUBLIC_URL}/images/logo.jpg`}
        alt="logo"
      />
      <div className={styles.success}>Praca zgłoszona pomyślnie</div>
      <div>Możesz zamknąć kartę i wrócić do swoich ulubionych czynności.</div>
    </div>
  );
}
