import React, { useRef } from "react";
import styles from "./styles/ContestCreationForm.module.css";

interface IProps {
  initial: string;
}

export default function DescriptionInput({ initial }: IProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + 10 + "px";
  };

  handleTextareaChange();

  return (
    <div style={{ marginBottom: "20px" }}>
      <label htmlFor="description-input" className={styles.label}>
        Opis
      </label>
      <br />
      <textarea
        required
        id="description-input"
        name="description"
        defaultValue={initial}
        className={styles.textarea}
        ref={textareaRef}
        onChange={handleTextareaChange}
      ></textarea>
    </div>
  );
}
