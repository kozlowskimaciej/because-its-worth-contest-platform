import React from "react";
import styles from "./styles/ContestPreview.module.css";

interface IProps {
  controlButtons: {
    text: string;
    class: string;
    onClick: Function;
  }[];
}

export default function ControlButtons({ controlButtons }: IProps) {
  return (
    <div className={styles["btn-wrapper"]}>
      {controlButtons.map((button, index) => (
        <button
          key={index}
          className={button.class}
          onClick={() => button.onClick()}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
}
