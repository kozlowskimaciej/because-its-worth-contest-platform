import React from "react";
import styles from "./styles/Loading.module.css";
import { SyncLoader } from "react-spinners";

interface ILoadingProps {
  text: string;
}

export default function Loading({ text }: ILoadingProps) {
  return (
    <div className={styles.loading}>
      <div className={styles.logo}>
        <SyncLoader color="var(--accent-color)" />
      </div>
      <h2 className={styles.text}>{text}</h2>
    </div>
  );
}
