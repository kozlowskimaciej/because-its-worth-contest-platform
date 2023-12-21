import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const loginInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginInput = loginInputRef.current;
    const passwordInput = passwordInputRef.current;

    if (!loginInput || !passwordInput) return;

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/auth/login`,
        {
          login: loginInput.value,
          password: passwordInput.value,
        },
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  const handleFocus = (elementRef: React.RefObject<HTMLInputElement>) => {
    const element = elementRef.current;

    if (!element) return;
    element.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label
          onClick={(e) => {
            e.preventDefault();
            handleFocus(loginInputRef);
          }}
        >
          login
        </label>
        <input type="text" ref={loginInputRef} />
      </div>
      <div>
        <label
          onClick={(e) => {
            e.preventDefault();
            handleFocus(passwordInputRef);
          }}
        >
          password
        </label>
        <input type="password" ref={passwordInputRef} />
      </div>
      <button type="submit">login</button>
    </form>
  );
}
