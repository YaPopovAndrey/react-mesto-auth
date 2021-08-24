import React from "react";
import api from "../utils/api";
import { useHistory } from "react-router-dom";
import { DataUserContext } from "../contexts/CurrentUserContext";

function Login(props) {
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const history = useHistory();
  const dataUser = React.useContext(DataUserContext);

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    api
      .authorize(userEmail, userPassword)
      .then((res) => {
        if (res.token) {
          dataUser.email = userEmail;
          localStorage.setItem("token", res.token);
          props.changeLoggedIn();
          history.push("/");
        }
      })
      .catch((err) => {
        props.setRegistrationStatus(false);
        props.popupOpen();
        console.log(err);
      });
  }

  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form className="login__form" onSubmit={handleSubmit}>
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
            value={userEmail}
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
            value={userPassword}
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
