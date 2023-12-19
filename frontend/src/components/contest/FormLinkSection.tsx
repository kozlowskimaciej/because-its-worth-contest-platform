import React from "react";

interface IProps {
  id: string;
}

export default function FormLinkSection({ id }: IProps) {
  return (
    <div style={{ overflowX: "hidden" }}>
      <h3>Formularz zgłoszeniowy</h3>
      <a
        href={`${window.location.origin}/forms/${id}`}
        target="_blank"
        rel="noreferrer"
      >
        {`${window.location.origin}/forms/${id}`}
      </a>
    </div>
  );
}
