import React from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

function Register(props) {
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    api
      .register(userEmail, userPassword)
      .then((res) => {
        if (res.data) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: res.data.email,
              _id: res.data._id,
            })
          );
          props.setRegistrationStatus(true);
          props.popupOpen();
        }
      })
      .catch(() => {
        props.setRegistrationStatus(false);
        props.popupOpen();
      });
  }

  return (
    <div className="login">
      <h1 className="login__title">Регистрация</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Email"
            id="email-input"
            className="login__input"
            name="email"
            value={userEmail}
            required
            minLength={2}
            maxLength={50}
            autoComplete="on"
            onChange={handleUserEmail}
            type="email"
          />
          <input
            placeholder="Пароль"
            id="password-input"
            className="login__input"
            name="code"
            value={userPassword}
            required
            minLength={2}
            maxLength={50}
            onChange={handleUserPassword}
            type="password"
          />
        </div>
        <div>
          <button type="submit" className="login__save">
            Зарегистрироваться
          </button>
          <p className="login__text">
            Уже зарегистрированы?{" "}
            <Link to="/sign-in" className="login__link">
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
