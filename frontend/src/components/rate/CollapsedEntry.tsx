import React from "react";
import { Entry } from "../../models/Entry";
import styles from "./styles/CollapsedEntry.module.css";
import { useRateContext } from "../../contexts/RateContext";
import PlaceSelect from "./PlaceSelect";

interface IProps {
  entry: Entry;
}

export default function CollapsedEntry({ entry }: IProps) {
  const { handleOpenEntry } = useRateContext();

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        {entry.author.firstName} {entry.author.lastName}
      </div>
      <PlaceSelect entry={entry} />
      <button onClick={() => handleOpenEntry(entry.id)}>open</button>
    </div>
  );
}
