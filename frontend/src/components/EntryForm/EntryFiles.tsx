import React, { useRef } from "react";
import {
  AVAILABLE_IMAGE_FORMATS,
  AVAILABLE_VIDEOS_FORMATS,
} from "../../constants";
import styles from "./styles/EntryFiles.module.css";

interface IProps {
  acceptedFormats: string[];
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function EntryFiles({
  acceptedFormats,
  files,
  setFiles,
}: IProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formattedFileFormats = acceptedFormats
    .map((format) => `.${format}`)
    .join(", ");

  const getExtension = (filename: string): string => {
    const splitted = filename.split(".");
    return splitted[splitted.length - 1];
  };

  const createImage = (file: File): JSX.Element => {
    return (
      <img className={styles.file} src={URL.createObjectURL(file)} alt="file" />
    );
  };

  const createVideo = (file: File): JSX.Element => {
    return (
      <video
        src={URL.createObjectURL(file)}
        className={styles.file}
        autoPlay
        muted
        loop
      >
        Twoja przeglądarka nie uruchamia plików video
      </video>
    );
  };

  const createElement = (file: File): JSX.Element => {
    const ext = getExtension(file.name);

    if (AVAILABLE_IMAGE_FORMATS.includes(ext)) return createImage(file);
    if (AVAILABLE_VIDEOS_FORMATS.includes(ext)) return createVideo(file);
    return <></>;
  };

  const handleFilesInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...filesArray]);
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, id) => id !== index));

    const fileInput = fileInputRef.current;
    if (!fileInput) return;

    fileInput.value = "";
  };

  return (
    <div id="entry-form-file-input">
      <input
        type="file"
        multiple
        id="entry-files"
        name="files"
        accept={formattedFileFormats}
        style={{ display: "none" }}
        onChange={handleFilesInput}
        ref={fileInputRef}
      />
      <label className={styles.files} htmlFor="entry-files">
        <img src={`${process.env.PUBLIC_URL}/icons/plus.svg`} alt="" />
        <span>Załącz pliki</span>
      </label>
      <ul>
        {files.map((file, index) => (
          <li key={index} className={styles.li}>
            <div className={styles["file-wrapper"]}>
              {createElement(file)}
              <div>{file.name}</div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRemove(index);
              }}
              className={styles.remove}
            >
              usuń
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
