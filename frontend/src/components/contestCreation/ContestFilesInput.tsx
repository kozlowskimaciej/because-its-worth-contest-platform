import React from "react";
import styles from "./styles/MultipleElementsAdder.module.css";
import styles2 from "./styles/ContestCreationForm.module.css";
import { useContestCreationFormContext } from "../../contexts/ContestCreationFormContext";

export default function ContestFilesInput() {
  const { files, setFiles } = useContestCreationFormContext();

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, id) => id !== index));
  };

  return (
    <div style={{ marginBottom: "50px" }}>
      <label className={styles2.label}>Pliki z regulaminem</label>
      <br />
      <input
        type="file"
        multiple
        id="file-input"
        accept=".docx, .pdf"
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />
      <ul>
        {files.map((file, index) => (
          <li key={index} className={styles.li}>
            <span>{file.name}</span>
            <button
              className={styles.remove}
              title="usuń"
              onClick={(e) => {
                e.preventDefault();
                removeFile(index);
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/icons/remove.svg`}
                alt="usuń"
              />
            </button>
          </li>
        ))}
      </ul>
      <label
        htmlFor="file-input"
        className={styles.new}
        style={{ width: "fit-content" }}
      >
        <img src={`${process.env.PUBLIC_URL}/icons/plus.svg`} alt="dodaj" />
        <span>Dodaj pliki</span>
      </label>
    </div>
  );
}
