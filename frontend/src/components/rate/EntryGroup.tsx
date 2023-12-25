import React from "react";
import { ExpandableEntry } from "../../models/Entry";
import Entry from "./Entry";
import styles from "./styles/EntriesGroup.module.css";
import CollapsedEntry from "./CollapsedEntry";

interface IProps {
  expandableEntries: ExpandableEntry[];
  title: string;
}

export default function EntryGroup({ expandableEntries, title }: IProps) {
  return (
    <div className={`container ${styles.wrapper}`}>
      <h2>{title}</h2>
      {expandableEntries.map((expEntry) => {
        return expEntry.isExpanded ? (
          <Entry key={expEntry.entry.id} entry={expEntry.entry} />
        ) : (
          <CollapsedEntry key={expEntry.entry.id} entry={expEntry.entry} />
        );
      })}
    </div>
  );
}
