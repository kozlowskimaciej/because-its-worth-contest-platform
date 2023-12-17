import React from "react";
import styles from "./styles/ContestCreationForm.module.css";
import { CONTEST_TYPES } from "../../constants";

interface IProps {
  initial: string;
}

export default function ContestCategorySelector({ initial }: IProps) {
  return (
    <div style={{ marginBottom: "50px" }}>
      <label className={styles.label}>Kategoria konkursu</label>
      <br />
      {CONTEST_TYPES.map((type, index) => (
        <React.Fragment key={index}>
          <input
            type="radio"
            value={type}
            name="type"
            defaultChecked={type === initial}
          />{" "}
          {type}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}
