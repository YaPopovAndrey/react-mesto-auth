import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import React from "react";
import api from "../utils/api";
import auth from "../utils/auth";
import {
  CurrentUserContext,
  DataUserContext,
} from "../contexts/CurrentUserContext";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, handleCardClick] = React.useState();
  const [InfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);

  const [registrationStatus, setRegistrationStatus] = React.useState(false);

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    handleCardClick();
    setInfoTooltipPopupOpen(false);
  }

  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);

  const handleInfoTooltipPopupOpen = () => setInfoTooltipPopupOpen(true);

  const handleEditProfileClick = () => setEditProfilePopupOpen(true);

  const handleAddPlaceClick = () => setAddPlacePopupOpen(true);

  const [currentUser, setCurrentUser] = React.useState({});
  const [dataUser, setDataUser] = React.useState({});

  React.useEffect(() => {
    api
      .getProfileValues()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleUpdateUser(opt) {
    api
      .setUserInfo(opt)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(opt) {
    api
      .submitNewAvatar(opt)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Получение массива карточек

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getArrCard()
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then((result) => {
        setCards(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => {
          return c._id !== card._id;
        });
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // добавление новой карточки

  function setNewCard(opt) {
    api
      .setNewCard(opt)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // реакт роутер

  const [loggedIn, setLoggedIn] = React.useState({
    loggedIn: false,
  });

  function changeLoggedIn() {
    setLoggedIn({
      loggedIn: true,
    });
  }

  const history = useHistory();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth.getContent(token)
      .then((data) => {
        if (data) {
          changeLoggedIn();

          setDataUser({
            email: data.data.email,
            _id: data.data._id,
          });

          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, []);

  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  function handleLoginSubmit(e) {
    e.preventDefault();
    auth
      .authorize(userEmail, userPassword)
      .then((res) => {
        if (res.token) {
          dataUser.email = userEmail;
          localStorage.setItem("token", res.token);
          changeLoggedIn();
          history.push("/");
        }
      })
      .catch((err) => {
        setRegistrationStatus(false);
        handleInfoTooltipPopupOpen();
        console.log(err);
      });
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    auth
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
          setRegistrationStatus(true);
          handleInfoTooltipPopupOpen();
        }
      })
      .catch(() => {
        setRegistrationStatus(false);
        handleInfoTooltipPopupOpen();
      });
  }

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    
    return () => document.removeEventListener('keydown', closeByEscape)
}, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <DataUserContext.Provider value={dataUser}>
        <div className="page">
          <div className="page__container">
            <Header />
            <Switch>
              <Route path="/sign-up">
                <Register
                  setRegistrationStatus={setRegistrationStatus}
                  onRegister={handleRegisterSubmit}
                  setUserEmail={setUserEmail}
                  setUserPassword={setUserPassword}
                  userEmail={userEmail}
                  userPassword={userPassword}
                />
              </Route>
              <Route path="/sign-in">
                <Login
                  setRegistrationStatus={setRegistrationStatus}
                  onLogin={handleLoginSubmit}
                  setUserEmail={setUserEmail}
                  setUserPassword={setUserPassword}
                  userEmail={userEmail}
                  userPassword={userPassword}
                />
              </Route>
              <ProtectedRoute path="/" loggedIn={loggedIn.loggedIn}>
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  handleCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />

                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  setNewCard={setNewCard}
                />

                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <Footer />
              </ProtectedRoute>
            </Switch>
            <InfoTooltip
                  isOpen={InfoTooltipPopupOpen}
                  onClose={closeAllPopups}
                  registrationStatus={registrationStatus}
                />
          </div>
        </div>
      </DataUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
