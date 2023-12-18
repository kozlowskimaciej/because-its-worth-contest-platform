import React from "react";
import { ExpandableEntry } from "../../models/Entry";
import Entry from "./Entry";
import styles from "./styles/EntriesGroup.module.css";
import CollapsedEntry from "./CollapsedEntry";

interface IProps {
  expandableEntries: ExpandableEntry[];
  title: string;
  open: Function;
  close: Function;
}

export default function EntryGroup({
  expandableEntries,
  title,
  open,
  close,
}: IProps) {
  return (
    <div className={styles.wrapper}>
      <h2>{title}</h2>
      {expandableEntries.map((expEntry) => {
        return expEntry.isExpanded ? (
          <Entry key={expEntry.entry.id} entry={expEntry.entry} close={close} />
        ) : (
          <CollapsedEntry
            key={expEntry.entry.id}
            entry={expEntry.entry}
            open={open}
          />
        );
      })}
    </div>
  );
}
