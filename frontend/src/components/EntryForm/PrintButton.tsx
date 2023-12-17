import React from "react";
import { useReactToPrint } from "react-to-print";
import styles from "./styles/PrintButton.module.css";

interface IProps {
  element: HTMLElement;
}

export default function PrintButton({ element }: IProps) {
  const handlePrint = useReactToPrint({
    onBeforeGetContent: () => {
      document.getElementById("entry-form-file-input")!.style.display = "none";
      document.getElementById("entry-form-submit")!.style.display = "none";
    },
    onAfterPrint: () => {
      document.getElementById("entry-form-file-input")!.style.display = "block";
      document.getElementById("entry-form-submit")!.style.display = "";
    },
    content: () => element,
  });

  return (
    <button className={styles.button} onClick={handlePrint}>
      <img src={`${process.env.PUBLIC_URL}/icons/print.svg`} alt="" />
      Drukuj
    </button>
  );
}
