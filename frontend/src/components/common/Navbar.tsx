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
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-0 fixed-top">
      <div className="container-fluid p-0">
        <button
          className="navbar-toggler m-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {buttons.map((button, index) => (
              <li key={index} className="nav-item">
                <button
                  className={`${styles.button} ${
                    button.isActive ? styles.active : null
                  }`}
                  onClick={button.onclick}
                >
                  {button.text}
                </button>
              </li>
            ))}
          </ul>
          <form className="d-flex">
            <button
              onClick={handleLogout}
              className={`navbar-brand ${styles.logout}`}
            >
              WYLOGUJ SIĘ
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
