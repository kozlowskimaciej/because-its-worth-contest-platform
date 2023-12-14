import React from "react";
import styles from "./styles/ContestCreationForm.module.css";
import { CONTEST_TYPES } from "../../constants";

export default function ContestCategorySelector() {
  return (
    <div style={{ marginBottom: "50px" }}>
      <label className={styles.label}>kategoria konkursu</label>
      <br />
      {CONTEST_TYPES.map((type, index) => (
        <React.Fragment key={index}>
          <input type="radio" value={type} name="type" /> {type}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}
