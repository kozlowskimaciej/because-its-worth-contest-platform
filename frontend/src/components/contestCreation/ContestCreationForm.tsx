import React, { useState, useRef } from "react";
import styles from "./styles/ContestCreationForm.module.css";

export default function ContestCreationForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);
  const [acceptableFiles, setAcceptableFiles] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + 10 + "px";
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, id) => id !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("participants", JSON.stringify(participants));
    formData.append("formats", JSON.stringify(acceptableFiles));
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.forEach((val, key) => {
      console.log(key, val);
    });
  };

  const contestTypes = ["literacki", "muzyczny", "fotograficzny", "filmowy"];

  const participantsTypes = ["5 - 8", "8 - 10", "10 - 12", "12 - 14"];

  const allFilesFormats = [
    ".jpg",
    ".png",
    ".svg",
    ".pdf",
    ".mp3",
    ".mp4",
    ".wav",
    ".docx",
  ];

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div style={{ textAlign: "left" }}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="title-input" className={styles.label}>
            tytuł
          </label>
          <br />
          <input
            type="text"
            required
            id="title-input"
            name="title"
            className={styles["title-input"]}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="description-input" className={styles.label}>
            opis
          </label>
          <br />
          <textarea
            required
            id="description-input"
            name="description"
            className={styles.textarea}
            ref={textareaRef}
            onChange={handleTextareaChange}
          ></textarea>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="date-input" className={styles.label}>
            data zakończenia
          </label>
          <br />
          <input
            type="date"
            required
            id="date-input"
            name="date"
            style={{
              borderRadius: "10px",
              border: "none",
              padding: "10px",
              marginTop: "10px",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="file-input" className={styles.label}>
            pliki
          </label>
          <br />
          <input
            type="file"
            multiple
            required
            id="file-input"
            accept=".docx, .pdf"
            onChange={handleFileInputChange}
            style={{ display: "none" }}
          />
          <ul>
            {files.map((file, index) => (
              <li key={index} style={{ display: "flex" }}>
                <span>{file.name}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFile(index);
                  }}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label className={styles.label}>kategoria</label>
          <br />
          {contestTypes.map((type, index) => (
            <React.Fragment key={index}>
              <input type="radio" value={type} name="type" /> {type}
              <br />
            </React.Fragment>
          ))}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label className={styles.label}>kategoria wiekowa</label>
          <br />
          {participantsTypes.map((type, index) => (
            <React.Fragment key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={participants.includes(type)}
                  onChange={() => {
                    participants.includes(type)
                      ? setParticipants((prev) =>
                          prev.filter((part) => part !== type)
                        )
                      : setParticipants((prev) => [...prev, type]);
                  }}
                />
                {type}
              </label>
              <br />
            </React.Fragment>
          ))}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label className={styles.label}>akceptowane formaty plików</label>
          <br />
          {allFilesFormats.map((type, index) => (
            <React.Fragment key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={acceptableFiles.includes(type)}
                  onChange={() => {
                    acceptableFiles.includes(type)
                      ? setAcceptableFiles((prev) =>
                          prev.filter((part) => part !== type)
                        )
                      : setAcceptableFiles((prev) => [...prev, type]);
                  }}
                />
                {type}
              </label>
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>
      <button type="submit" className={styles.button}>
        utwórz
      </button>
    </form>
  );
}
