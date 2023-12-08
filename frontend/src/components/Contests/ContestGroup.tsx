import React from "react";
import styles from "./styles/ContestGroup.module.css";
import { Contest } from "../../models/Contest";

interface IContestGroup {
  title: string;
  items: Array<
    {
      onclick: React.MouseEventHandler<HTMLButtonElement>;
    } & Contest
  >;
}

export default function ContestGroup({ title, items }: IContestGroup) {
  return (
    <div className={styles.wrapper}>
      <h2>{title}</h2>
      <div className={styles.group}>
        {items.map((item, index) => (
          <button key={index} className={styles.card} onClick={item.onclick}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
