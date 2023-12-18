import React from "react";
import { Entry } from "../../models/Entry";
import styles from "./styles/CollapsedEntry.module.css";
import { useRateContext } from "../../contexts/RateContext";

interface IProps {
  entry: Entry;
}

export default function CollapsedEntry({ entry }: IProps) {
  const { handleOpenEntry, handleChangePlace } = useRateContext();

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        {entry.author.firstName} {entry.author.lastName}
      </div>
      <button onClick={() => handleChangePlace(entry.id, "laureat")}>
        change to laureat
      </button>
      <button onClick={() => handleOpenEntry(entry.id)}>open</button>
    </div>
  );
}
