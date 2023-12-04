import React, { useState } from "react";
import styles from "./styles/PublishForm.module.css";

export default function PublishForm() {
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

    files.forEach((file) => {
      const formData = new FormData();
      formData.append("file", file);

      fetch("http://localhost:8000/uploads", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="publish-files" className={styles.label}>
        wybierz pliki
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
          wyślij
        </button>
      </div>
    </form>
  );
}
