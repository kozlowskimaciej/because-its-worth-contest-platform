import React from "react";
import styles from "./styles/ContestCreationForm.module.css";

export default function TitleInput() {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label htmlFor="title-input" className={styles.label}>
        tytuł
      </label>
      <br />
      <input
        type="text"
        required
        id="title-input"
        name="title"
        className={styles["title-input"]}
      />
    </div>
  );
}
