import React from "react";
import styles from "./styles/ContestCreationForm.module.css";
import {
  AVAILABLE_IMAGE_FORMATS,
  AVAILABLE_VIDEOS_FORMATS,
  AVAILABLE_OTHER_FORMATS,
} from "../../constants";
import { useContestCreationFormContext } from "../../contexts/ContestCreationFormContext";

export default function FileFormatsSelector() {
  const { fileFormats, setFileFormats } = useContestCreationFormContext();

  const allFilesFormats = AVAILABLE_IMAGE_FORMATS.concat(
    AVAILABLE_VIDEOS_FORMATS
  ).concat(AVAILABLE_OTHER_FORMATS);

  const handleCheckBoxChange = (type: string) => {
    if (fileFormats.includes(type))
      setFileFormats((prev) => prev.filter((part) => part !== type));
    else setFileFormats((prev) => [...prev, type]);
  };

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
              onChange={() => handleCheckBoxChange(type)}
            />
            <span style={{ paddingLeft: "5px" }}>{type}</span>
          </label>
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}
