import React, { useRef } from "react";
import styles from "./styles/SingleEntry.module.css";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  entryTitle: string;
}

export default function SingleEntry({ entryTitle, ...rest }: IProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.preventDefault();

    const input = inputRef.current;
    if (!input) return;

    input.focus();
  };

  return (
    <div className={styles.entry}>
      <label onClick={handleClick}>{entryTitle}</label>
      <input {...rest} ref={inputRef} />
    </div>
  );
}
