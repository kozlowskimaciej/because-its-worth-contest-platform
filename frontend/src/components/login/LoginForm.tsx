import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./styles/LoginForm.module.css";
import { useAppContext } from "../../contexts/AppContext";

export default function LoginForm() {
  const { tokenRef } = useAppContext();
  const navigate = useNavigate();
  const loginInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginInput = loginInputRef.current;
    const passwordInput = passwordInputRef.current;

    if (!loginInput || !passwordInput) return;

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        login: loginInput.value,
        password: passwordInput.value,
      })
      .then((data) => {
        if (data.status !== 200) throw new Error();
        tokenRef.current = data.data.token;
        navigate("/");
      })
      .catch((err) => toast.error("Logowanie nie powiodło się."));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <img
        className={styles.logo}
        src={`${process.env.PUBLIC_URL}/images/logo.jpg`}
      />
      <input
        type="text"
        ref={loginInputRef}
        placeholder="login"
        className={styles.input}
      />
      <br />
      <input
        type="password"
        ref={passwordInputRef}
        placeholder="hasło"
        className={styles.input}
      />
      <br />
      <button className={styles.button} type="submit">
        zaloguj się
      </button>
    </form>
  );
}
