import React, { useState } from "react";
import { Entry, Entry as EntryType, ExpandableEntry } from "../../models/Entry";
import EntryGroup from "./EntryGroup";
import { useRateContext } from "../../contexts/RateContext";

export default function Entries() {
  const { expandableEntries } = useRateContext();
  // const [expandableEntries, setExpandableEntries] = useState<ExpandableEntry[]>(
  //   entries.map((entry) => ({
  //     entry,
  //     isExpanded: false,
  //   }))
  // );

  // const open = (id: string) => {
  //   setExpandableEntries((prev) => {
  //     return prev.map((expEntry) => {
  //       if (expEntry.entry.id !== id) return expEntry;

  //       return {
  //         isExpanded: true,
  //         entry: expEntry.entry,
  //       };
  //     });
  //   });
  // };

  // const close = (id: string) => {
  //   setExpandableEntries((prev) => {
  //     return prev.map((expEntry) => {
  //       if (expEntry.entry.id !== id) return expEntry;

  //       return {
  //         isExpanded: false,
  //         entry: expEntry.entry,
  //       };
  //     });
  //   });
  // };

  // const changePlace = (id: string, newPlace: string | null) => {
  //   setExpandableEntries((prev) => {
  //     return prev.map((expEntry) => {
  //       if (expEntry.entry.id !== id) return expEntry;

  //       return {
  //         isExpanded: expEntry.isExpanded,
  //         entry: { ...expEntry.entry, place: newPlace } as Entry,
  //       };
  //     });
  //   });
  // };

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
        />
      ))}
    </>
  );
}
