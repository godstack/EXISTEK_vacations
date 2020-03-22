import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/auth.context";
import "../css/AuthPage.css";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = event => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });

      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.user);
    } catch (e) {}
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-title">Authorization</div>
      <div className="auth-inputs">
        <input
          type="text"
          name="email"
          placeholder="Enter email"
          onChange={changeHandler}
          value={form.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={changeHandler}
          value={form.password}
        />
      </div>

      <div className="auth-buttons">
        <button
          className="button btn-login"
          disabled={loading}
          onClick={loginHandler}
        >
          Login
        </button>

        <button
          className="button btn-register"
          onClick={registerHandler}
          disabled={loading}
        >
          Register
        </button>
      </div>
    </div>
  );
};
