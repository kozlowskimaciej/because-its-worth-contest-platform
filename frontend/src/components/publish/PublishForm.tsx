import React, { useState } from "react";
import styles from "./styles/PublishForm.module.css";
import { useNavigate } from "react-router-dom";

export default function PublishForm() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);

  const handleNewFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles((prev) => [...prev, ...e.target.files!]);
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, id) => id !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    formData.forEach((val, key) => {
      console.log(key, val);
    });

    navigate(`/contests`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="publish-files" className={styles.label}>
        Wybierz pliki
      </label>
      <input
        type="file"
        multiple
        style={{ display: "none" }}
        id="publish-files"
        accept=".txt"
        onChange={handleNewFiles}
      />
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <span>{file.name}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRemove(index);
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <div style={{ width: "100%", textAlign: "center" }}>
        <button type="submit" className={styles.button}>
          Wyślij
        </button>
      </div>
    </form>
  );
}
