import React from "react";
import { getFilename } from "../../utils/getFilename";

interface IProps {
  title: string;
  files: string[];
}

export default function FileListSection({ title, files }: IProps) {
  return (
    <div>
      <h3>{title}</h3>
      <ul style={{ overflowX: "hidden" }}>
        {files.map((file, index) => (
          <li key={index}>
            <a href={file} target="_blank" rel="noreferrer">
              {getFilename(file)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
