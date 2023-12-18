import React from "react";
import EntryGroup from "./EntryGroup";
import { useRateContext } from "../../contexts/RateContext";

export default function Entries() {
  const { expandableEntries } = useRateContext();

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
