import React from "react";
import styles from "./styles/ContestCreationForm.module.css";

export default function DeadlineInput() {
  return (
    <div style={{ marginBottom: "50px" }}>
      <label htmlFor="date-input" className={styles.label}>
        data zakończenia
      </label>
      <br />
      <input
        type="date"
        required
        id="date-input"
        name="date"
        style={{
          borderRadius: "10px",
          border: "none",
          padding: "10px",
          marginTop: "10px",
        }}
      />
    </div>
  );
}
