import React from "react";
import { useParams } from "react-router-dom";
import * as api from "../../fakeApi/entries";
import Entry from "../common/Entry";
import { prepareEntries } from "../../utils/prepareEntries";
import styles from "./styles/Entries.module.css";

export default function Entries() {
  const { id } = useParams();

  // fetch entries based on id

  const entries = prepareEntries(api.entries);

  return (
    <div className={styles.wrapper}>
      <h2>Zgłoszone prace</h2>
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
