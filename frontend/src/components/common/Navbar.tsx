import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Navbar.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { errorConfig, successConfig } from "../../config/toasts";

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

  const handleLogout = () => {
    if (!window.confirm("Czy na pewno chcesz się wylogować?")) return;

    const id = toast.loading("Proszę czekać...");
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        if (data.status !== 200) throw new Error();
        toast.update(id, successConfig("Wylogowanie powiodło się."));
        navigate("/login");
      })
      .catch((err) => {
        toast.update(id, errorConfig("Wystąpił błąd podczas wylogowywania."));
      });
  };

  return (
    <header className={styles.header}>
      <div className={styles.buttons}>
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.isActive ? () => {} : button.onclick}
            className={`${styles.button} ${
              button.isActive ? styles.active : ""
            }`}
          >
            {button.text}
          </button>
        ))}
      </div>
      <button className={styles.logout} onClick={handleLogout}>
        WYLOGUJ SIĘ
      </button>
    </header>
  );
}
