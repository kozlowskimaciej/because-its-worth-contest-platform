import React from "react";
import styles from "./styles/PublishForm.module.css";
import { useNavigate } from "react-router-dom";
import FileInput from "./FileInput";
import FilesDisplayer from "./FilesDisplayer";
import { usePublishContext } from "../../contexts/PublishContext";

export default function PublishForm() {
  const { files } = usePublishContext();
  const navigate = useNavigate();

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
      <FileInput />
      <FilesDisplayer />
      <div style={{ width: "100%", textAlign: "center" }}>
        <button type="submit" className={styles.button}>
          Wyślij
        </button>
      </div>
    </form>
  );
}
