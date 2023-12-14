import React, { useRef } from "react";
import styles from "./styles/ContestCreationForm.module.css";

export default function DescriptionInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + 10 + "px";
  };
  return (
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
  );
}
