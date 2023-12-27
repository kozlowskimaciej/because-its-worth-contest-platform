import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Navbar.module.css";
import { toast } from "react-toastify";
import { useAppContext } from "../../contexts/AppContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { tokenRef } = useAppContext();

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

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!window.confirm("Czy na pewno chcesz się wylogować?")) return;

    tokenRef.current = null;

    toast.success("Wylogowanie powiodło się.");

    navigate("/login");
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
            <button onClick={handleLogout} className={`${styles.logout}`}>
              WYLOGUJ SIĘ
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
