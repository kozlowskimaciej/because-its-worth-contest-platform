import React from "react";
import styles from "./styles/NotFoundInfo.module.css";
import { useNavigate } from "react-router-dom";

interface IProps {
  text?: string;
  isDisplayingButton?: boolean;
}

export default function NotFoundInfo({
  text = "Podana strona nie istnieje.",
  isDisplayingButton = true,
}: IProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.image}
        src={`${process.env.PUBLIC_URL}/images/logo.jpg`}
        alt="logo"
      />
      <p className={styles.p}>{text}</p>
      {isDisplayingButton && (
        <button className={styles.button} onClick={() => navigate("/")}>
          Wróć na stronę główną
        </button>
      )}
    </div>
  );
}
