import React from "react";
import { Entry } from "../../models/Entry";
import styles from "./styles/CollapsedEntry.module.css";

interface IProps {
  entry: Entry;
  open: Function;
  changePlace: Function;
}

export default function CollapsedEntry({ entry, open, changePlace }: IProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        {entry.author.firstName} {entry.author.lastName}
      </div>
      <button onClick={() => changePlace(entry.id, "laureat")}>
        changePlace
      </button>
      <button onClick={() => open(entry.id)}>open</button>
    </div>
  );
}
