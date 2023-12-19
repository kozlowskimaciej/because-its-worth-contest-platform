import React from "react";
import { usePublishContext } from "../../contexts/PublishContext";

export default function FilesDisplayer() {
  const { files, setFiles } = usePublishContext();

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, id) => id !== index));
  };

  return (
    <ul>
      {files.map((file, index) => (
        <li key={index}>
          <span>{file.name}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleRemove(index);
            }}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  );
}
