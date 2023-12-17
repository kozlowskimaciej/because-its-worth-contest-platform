import React from "react";
import styles from "./styles/ContestCreationForm.module.css";
import {
  AVAILABLE_IMAGE_FORMATS,
  AVAILABLE_VIDEOS_FORMATS,
  AVAILABLE_OTHER_FORMATS,
} from "../../constants";

interface IProps {
  fileFormats: string[];
  setFileFormats: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function FileFormatsSelector({
  fileFormats,
  setFileFormats,
}: IProps) {
  const allFilesFormats = AVAILABLE_IMAGE_FORMATS.concat(
    AVAILABLE_VIDEOS_FORMATS
  ).concat(AVAILABLE_OTHER_FORMATS);

  return (
    <div style={{ marginBottom: "20px" }}>
      <label className={styles.label}>Akceptowane formaty plików</label>
      <br />
      {allFilesFormats.map((type, index) => (
        <React.Fragment key={index}>
          <label>
            <input
              type="checkbox"
              defaultChecked={fileFormats.includes(type)}
              onChange={() => {
                fileFormats.includes(type)
                  ? setFileFormats((prev) =>
                      prev.filter((part) => part !== type)
                    )
                  : setFileFormats((prev) => [...prev, type]);
              }}
            />
            {type}
          </label>
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}
