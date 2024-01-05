import React from "react";
import styles from "./styles/ContestCreationForm.module.css";
import styles2 from "./styles/BackgroundSelector.module.css";
import { useContestCreationFormContext } from "../../contexts/ContestCreationFormContext";

export default function BackgroundSelector() {
  const { background, setBackground } = useContestCreationFormContext();

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setBackground(file);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <div className={styles.label}>Tło karty zgłoszeniowej</div>
      <div style={{ marginTop: "2rem" }}>
        <label htmlFor="background-selector" className={styles2.button}>
          {background ? "Zmień tło" : "Wybierz tło"}
        </label>
        <input
          id="background-selector"
          type="file"
          accept=".jpg, .png, .svg"
          style={{ display: "none" }}
          onChange={handleBackgroundChange}
        />
      </div>
      {background && (
        <img src={URL.createObjectURL(background)} className={styles2.image} />
      )}
    </div>
  );
}
