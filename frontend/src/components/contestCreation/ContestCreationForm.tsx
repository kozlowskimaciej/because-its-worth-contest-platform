import React, { useState, useRef } from "react";
import styles from "./styles/ContestCreationForm.module.css";
import {
  AVAILABLE_IMAGE_FORMATS,
  AVAILABLE_OTHER_FORMATS,
  AVAILABLE_VIDEOS_FORMATS,
  CONTEST_TYPES,
} from "../../constants";
import { useNavigate } from "react-router-dom";
import ParticipantsCategory from "./ParticipantsCategory";
import ContestFiles from "./ContestFiles";

export default function ContestCreationForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);
  const [acceptableFiles, setAcceptableFiles] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const handleTextareaChange = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + 10 + "px";
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

    navigate("/contests");
  };

  const allFilesFormats = AVAILABLE_IMAGE_FORMATS.concat(
    AVAILABLE_VIDEOS_FORMATS
  )
    .concat(AVAILABLE_OTHER_FORMATS)
    .map((ext) => `.${ext}`);

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
        <div style={{ marginBottom: "50px" }}>
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
        <ContestFiles files={files} setFiles={setFiles} />
        <div style={{ marginBottom: "50px" }}>
          <label className={styles.label}>kategoria konkursu</label>
          <br />
          {CONTEST_TYPES.map((type, index) => (
            <React.Fragment key={index}>
              <input type="radio" value={type} name="type" /> {type}
              <br />
            </React.Fragment>
          ))}
        </div>
        <ParticipantsCategory
          participants={participants}
          setParticipants={setParticipants}
        />
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
