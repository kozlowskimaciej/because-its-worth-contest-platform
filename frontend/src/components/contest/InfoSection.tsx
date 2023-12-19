import React from "react";

interface IProps {
  title: string;
  content: {
    styles: string;
    text: string;
  };
}

export default function InfoSection({ title, content }: IProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p className={content.styles}>{content.text}</p>
    </div>
  );
}
