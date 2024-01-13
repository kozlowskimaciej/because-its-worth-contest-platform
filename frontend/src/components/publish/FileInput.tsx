import React, { useRef } from "react";
import { usePublishContext } from "../../contexts/PublishContext";
import styles from "./styles/PublishForm.module.css";

export default function FileInput() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setFiles } = usePublishContext();

  const handleNewFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles((prev) => [...prev, ...e.target.files!]);
  };

  const handleLabelClick = (
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>
  ) => {
    e.preventDefault();

    const fileInput = fileInputRef.current;
    if (!fileInput) return;

    fileInput.click();
  };

  return (
    <>
      <label onClick={handleLabelClick} className={styles.label}>
        Wybierz pliki
      </label>
      <input
        type="file"
        multiple
        style={{ display: "none" }}
        accept=".txt"
        onChange={handleNewFiles}
        ref={fileInputRef}
      />
    </>
  );
}
