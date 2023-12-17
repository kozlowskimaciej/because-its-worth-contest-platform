import React from "react";
import Entry from "../common/Entry";
import styles from "./styles/Entries.module.css";
import { Entry as EntryType } from "../../models/Entry";
import { useParams } from "react-router-dom";

interface IProps {
  entries: EntryType[];
}

export default function Entries({ entries }: IProps) {
  const { id } = useParams();

  const filteredEntries = entries.filter((entry) => entry.contestID === id);

  return (
    <div className={styles.wrapper}>
      <h2>Zgłoszone prace</h2>
      {filteredEntries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
