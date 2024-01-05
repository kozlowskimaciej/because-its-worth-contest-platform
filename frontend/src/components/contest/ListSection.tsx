import React from "react";

interface IProps {
  title: string;
  content: string[];
}

export default function ListSection({ title, content }: IProps) {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {content.map((single, index) => (
          <li key={index}>{single}</li>
        ))}
      </ul>
    </div>
  );
}
