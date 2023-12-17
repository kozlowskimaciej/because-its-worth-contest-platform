import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Navbar.module.css";

export default function Navbar() {
  const navigate = useNavigate();

  const buttons = [
    {
      text: "GŁÓWNA",
      onclick: () => navigate("/"),
      isActive: window.location.pathname === "/",
    },
    {
      text: "KONKURSY",
      onclick: () => navigate("/contests"),
      isActive: window.location.pathname.startsWith("/contests"),
    },
    {
      text: "STWÓRZ",
      onclick: () => navigate("/contest/new"),
      isActive: window.location.pathname === "/contest/new",
    },
  ];

  return (
    <header className={styles.header}>
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.isActive ? () => {} : button.onclick}
          className={`${styles.button} ${button.isActive ? styles.active : ""}`}
        >
          {button.text}
        </button>
      ))}
    </header>
  );
}
