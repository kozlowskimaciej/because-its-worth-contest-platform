import React, { useState } from "react";
import { Entry as EntryType, ExpandableEntry } from "../../models/Entry";
import EntryGroup from "./EntryGroup";

interface IProps {
  entries: EntryType[];
}

export default function Entries({ entries }: IProps) {
  const [expandableEntries, setExpandableEntries] = useState<ExpandableEntry[]>(
    entries.map((entry) => ({
      entry,
      isExpanded: false,
    }))
  );

  const open = (id: string) => {
    setExpandableEntries((prev) => {
      return prev.map((expEntry) => {
        if (expEntry.entry.id !== id) return expEntry;

        return {
          isExpanded: true,
          entry: expEntry.entry,
        };
      });
    });
  };

  const close = (id: string) => {
    setExpandableEntries((prev) => {
      return prev.map((expEntry) => {
        if (expEntry.entry.id !== id) return expEntry;

        return {
          isExpanded: false,
          entry: expEntry.entry,
        };
      });
    });
  };

  const laureatEntries = expandableEntries.filter(
    (expEntry) => expEntry.entry.place === "laureat"
  );

  const wyroznienieEntries = expandableEntries.filter(
    (expEntry) => expEntry.entry.place === "wyroznienie"
  );

  const noRewardEntries = expandableEntries.filter(
    (expEntry) => expEntry.entry.place === "none"
  );

  const notRatedEntries = expandableEntries.filter(
    (expEntry) => expEntry.entry.place === null
  );

  const groups = [
    {
      title: "Laureaci",
      expandableEntries: laureatEntries,
    },
    {
      title: "Wyróżnienie",
      expandableEntries: wyroznienieEntries,
    },
    {
      title: "Brak nagrody",
      expandableEntries: noRewardEntries,
    },
    {
      title: "Nieocenione",
      expandableEntries: notRatedEntries,
    },
  ];

  return (
    <>
      {groups.map((group, id) => (
        <EntryGroup
          key={id}
          title={group.title}
          expandableEntries={group.expandableEntries}
          open={open}
          close={close}
        />
      ))}
    </>
  );
}
