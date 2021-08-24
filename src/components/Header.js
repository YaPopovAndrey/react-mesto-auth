import React from "react";
import logo from "../images/logo-header.svg";
import { Route, Switch, Link } from "react-router-dom";
import { DataUserContext } from "../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom";

function Header() {
  const dataUser = React.useContext(DataUserContext);
  const history = useHistory();

  function signOut() {
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  return (
    <header className="header">
      <img alt="логотип" src={logo} className="header__logo" />
      <Switch>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Зарегистрироваться
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__container">
            <p className="header__link">{dataUser.email}</p>
            <button className="header__button" onClick={signOut}>
              Выйти
            </button>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
