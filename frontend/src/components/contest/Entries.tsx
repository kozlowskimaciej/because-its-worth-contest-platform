import React from "react";
import Entry from "../common/Entry";
import styles from "./styles/Entries.module.css";
import { Entry as EntryType } from "../../models/Entry";

interface IProps {
  entries: EntryType[];
}

export default function Entries({ entries }: IProps) {
  return (
    <div className={styles.wrapper}>
      <h2>Zgłoszone prace</h2>
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
