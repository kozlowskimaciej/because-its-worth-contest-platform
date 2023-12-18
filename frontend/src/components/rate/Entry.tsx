import React from "react";
import { Entry as EntryType } from "../../models/Entry";
import {
  AVAILABLE_IMAGE_FORMATS,
  AVAILABLE_OTHER_FORMATS,
  AVAILABLE_VIDEOS_FORMATS,
} from "../../constants";
import styles from "./styles/Entry.module.css";

interface IProps {
  entry: EntryType;
  close: Function;
}

export default function Entry({ entry, close }: IProps) {
  const getExtension = (file: string): string => {
    const splitted = file.split(".");
    return splitted[splitted.length - 1];
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.text}>imie: {entry.author.firstName}</div>
        <button onClick={() => close(entry.id)}>close</button>
      </div>
      <div className={styles.text}>nazwisko: {entry.author.lastName}</div>
      {entry.author.phone && (
        <div className={styles.text}>numer telefonu: {entry.author.phone}</div>
      )}
      {entry.author.email && (
        <div className={styles.text}>email: {entry.author.email}</div>
      )}
      {entry.author.address && (
        <div className={styles.text}>adres: {entry.author.address}</div>
      )}
      {entry.guardian && (
        <div className={styles.text}>
          opiekun: {entry.guardian.firstName} {entry.guardian.lastName}
        </div>
      )}
      <div className={styles.text} style={{ marginTop: "20px" }}>
        zgłoszone prace:
      </div>
      <ul>
        {entry.files.map((file, index) => {
          const ext = getExtension(file);

          if (AVAILABLE_IMAGE_FORMATS.includes(ext)) {
            return (
              <li key={index}>
                <a href={file} target="_blank" rel="noopener noreferrer">
                  <img src={file} alt={file} className={styles.file} />
                </a>
              </li>
            );
          } else if (AVAILABLE_VIDEOS_FORMATS.includes(ext)) {
            return (
              <li key={index}>
                <video
                  src={file}
                  className={styles.file}
                  autoPlay
                  muted
                  controls
                  loop
                >
                  Twoja przeglądarka nie umożliwia odtwarzania video
                </video>
              </li>
            );
          } else if (AVAILABLE_OTHER_FORMATS.includes(ext)) {
            return (
              <li key={index}>
                <a href={file} target="_blank" rel="noopener noreferrer">
                  {file}
                </a>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
