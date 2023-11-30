import React from "react";
import styles from "./styles/ContestGroup.module.css";

interface IContestGroup {
  title: string;
  items: {
    id: number;
    title: string;
    description: string;
  }[];
}

export default function ContestGroup({ title, items }: IContestGroup) {
  return (
    <div className={styles.wrapper}>
      <h2>{title}</h2>
      <div className={styles.group}>
        {items.map((item, index) => (
          <button key={index} className={styles.card}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
