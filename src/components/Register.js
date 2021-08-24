import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const handleUserEmail = (e) => {
    props.setUserEmail(e.target.value);
  };

  const handleUserPassword = (e) => {
    props.setUserPassword(e.target.value);
  };

  return (
    <div className="login">
      <h1 className="login__title">Регистрация</h1>
      <form className="login__form" onSubmit={props.onRegister}>
        <div>
          <input
            placeholder="Email"
            id="email-input"
            className="login__input"
            name="email"
            value={props.userEmail}
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
            value={props.userPassword}
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
