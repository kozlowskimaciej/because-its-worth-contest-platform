import React from "react";

interface IProps {
  categories: string[];
}

export default function CategorySelector({ categories }: IProps) {
  return (
    <div style={{ marginTop: "50px" }}>
      <label>Wybierz swoją kategorię</label>
      <br />
      {categories.map((category, index) => (
        <React.Fragment key={index}>
          <input type="radio" value={category} name="type" /> {category}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}
