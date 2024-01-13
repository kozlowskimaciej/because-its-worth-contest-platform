import React from "react";
import { useReactToPrint } from "react-to-print";
import styles from "./styles/PrintButton.module.css";
import { useEntryFormContext } from "../../contexts/EntryFormContext";

export default function PrintButton() {
  const { entryFilesRef, entryFormRef, submitButtonRef } =
    useEntryFormContext();

  const handlePrint = useReactToPrint({
    onBeforeGetContent: () => {
      entryFilesRef.current!.style.display = "none";
      submitButtonRef.current!.style.display = "none";
    },
    onAfterPrint: () => {
      entryFilesRef.current!.style.display = "block";
      submitButtonRef.current!.style.display = "";
    },
    content: () => entryFormRef.current,
  });

  return (
    <button className={styles.button} onClick={handlePrint}>
      <img src={`${process.env.PUBLIC_URL}/icons/print.svg`} alt="" />
      Drukuj
    </button>
  );
}
