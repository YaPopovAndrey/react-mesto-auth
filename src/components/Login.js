import React from "react";

function Login(props) {
  const handleUserEmail = (e) => {
    props.setUserEmail(e.target.value);
  };

  const handleUserPassword = (e) => {
    props.setUserPassword(e.target.value);
  };

  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form className="login__form" onSubmit={props.onLogin}>
        <div>
          <input
            placeholder="Email"
            id="name-input"
            className="login__input"
            name="email"
            required
            minLength={2}
            maxLength={50}
            autoComplete="on"
            value={props.userEmail}
            onChange={handleUserEmail}
            type="email"
          />
          <input
            placeholder="Пароль"
            id="description-input"
            className="login__input"
            name="code"
            required
            minLength={2}
            maxLength={50}
            value={props.userPassword}
            onChange={handleUserPassword}
            type="password"
          />
        </div>
        <div>
          <button type="submit" className="login__save">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
