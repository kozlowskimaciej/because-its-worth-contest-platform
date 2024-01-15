import React from "react";
import { Entry } from "../../models/Entry";
import { useRateContext } from "../../contexts/RateContext";
import styles from "./styles/DeleteEntryButton.module.css";

interface IProps {
  entry: Entry;
}

export default function DeleteEntryButton({ entry }: IProps) {
  const { handleDeleteEntry } = useRateContext();

  const handleDeleteEntryClick = (entry: Entry) => {
    if (
      !window.confirm(
        `Czy na pewno chcesz usunąć zgłoszenie od ${entry.author.firstName} ${entry.author.lastName}? Operacja jest nieodwracalna.`
      )
    )
      return;

    handleDeleteEntry(entry.id);
  };

  return (
    <button
      className={styles.button}
      onClick={() => handleDeleteEntryClick(entry)}
      title="usuń zgłoszenie"
    >
      <img src={`${process.env.PUBLIC_URL}/icons/garbage.svg`} alt="usuń" />
    </button>
  );
}
