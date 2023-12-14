import React from "react";
import styles from "./styles/ContestCreationForm.module.css";

interface IProps {
  initial: string;
}

export default function TitleInput({ initial }: IProps) {
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
        defaultValue={initial}
        className={styles["title-input"]}
      />
    </div>
  );
}
