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
      <div className={styles.controls}>
        <PlaceSelect entry={entry} />
        <button
          className={styles.open}
          onClick={() => handleOpenEntry(entry.id)}
          title="pokaż szczegóły"
        >
          <img src={`${process.env.PUBLIC_URL}/icons/arrow.svg`} alt="" />
        </button>
      </div>
    </div>
  );
}
