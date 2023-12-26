import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./styles/LoginForm.module.css";

export default function LoginForm() {
  const navigate = useNavigate();
  const loginInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginInput = loginInputRef.current;
    const passwordInput = passwordInputRef.current;

    if (!loginInput || !passwordInput) return;

    const login = (): Promise<any> => {
      return axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/login`,
        {
          login: loginInput.value,
          password: passwordInput.value,
        },
        {
          withCredentials: true,
        }
      );
    };

    login()
      .then((data) => {
        if (data.status !== 200) throw new Error();
        navigate("/");
      })
      .catch((err) => {
        // Access-Control-Allow-Origin header is now set
        login()
          .then((data) => {
            if (data.status !== 200) throw new Error();
            navigate("/");
          })
          .catch((err) => toast.error("Logowanie nie powiodło się."));
      });
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
