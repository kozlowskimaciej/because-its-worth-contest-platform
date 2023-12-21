import React from "react";
import { Entry as EntryType } from "../../models/Entry";
import {
  AVAILABLE_IMAGE_FORMATS,
  AVAILABLE_OTHER_FORMATS,
  AVAILABLE_VIDEOS_FORMATS,
} from "../../constants";
import styles from "./styles/Entry.module.css";
import { useRateContext } from "../../contexts/RateContext";
import PlaceSelect from "./PlaceSelect";
import DeleteEntryButton from "./DeleteEntryButton";

interface IProps {
  entry: EntryType;
}

export default function Entry({ entry }: IProps) {
  const { handleCloseEntry } = useRateContext();

  const getExtension = (file: string): string => {
    const splitted = file.split(".");
    return splitted[splitted.length - 1];
  };

  const renderAuthorFields = () => {
    const authorFields = [];

    const fieldsToNames = {
      firstName: "imię",
      lastName: "nazwisko",
      phone: "numer telefonu",
      email: "email",
      address: "adres",
    } as any;

    for (const key in entry.author) {
      if (entry.author.hasOwnProperty(key) && (entry.author as any)[key]) {
        authorFields.push(
          <div className={styles.text} key={key}>
            <span className={styles.field}>{fieldsToNames[key]}: </span>
            {(entry.author as any)[key]}
          </div>
        );
      }
    }

    return authorFields;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <PlaceSelect entry={entry} />
        <button
          className={styles.close}
          onClick={() => handleCloseEntry(entry.id)}
          title="zwiń"
        >
          <img src={`${process.env.PUBLIC_URL}/icons/arrow.svg`} />
        </button>
        <DeleteEntryButton entry={entry} />
      </div>
      {renderAuthorFields()}
      {entry.guardian?.firstName && (
        <div className={styles.text}>
          <span className={styles.field}>opiekun: </span>
          {entry.guardian.firstName} {entry.guardian.lastName}
        </div>
      )}
      <div className={styles.text} style={{ marginTop: "20px" }}>
        <span className={styles.field}>zgłoszone prace: </span>
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
