import React from "react";
import { usePublishContext } from "../../contexts/PublishContext";
import styles from "./styles/FilesDiplayer.module.css";

export default function FilesDisplayer() {
  const { files, setFiles } = usePublishContext();

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, id) => id !== index));
  };

  return (
    <ul style={{ marginTop: "50px" }}>
      {files.map((file, index) => (
        <li key={index} className={styles.wrapper}>
          <span>{file.name}</span>
          <button
            className={styles.button}
            onClick={(e) => {
              e.preventDefault();
              handleRemove(index);
            }}
            title="usuń"
          >
            <img src={`${process.env.PUBLIC_URL}/icons/remove.svg`} />
          </button>
        </li>
      ))}
    </ul>
  );
}
