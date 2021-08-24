import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function renderArrCard(arr) {
    return arr.map((item) => {
      return (
        <Card
          card={item}
          onCardClick={props.handleCardClick}
          key={item._id}
          onCardLike={props.onCardLike}
          onCardDelete={props.onCardDelete}
        />
      );
    });
  }

  return (
    <>
      <section className="profile">
        <div className="profile__description">
          <div className="profile__avatar-container">
            <div
              className="profile__avatar"
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            ></div>
            <div
              className="profile__avatar-back"
              onClick={props.onEditAvatar}
            />
          </div>
          <div className="profile__profile-info">
            <h1 className="profile__first-name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="edit"
              onClick={props.onEditProfile}
            />
            <p className="profile__last-name">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="add"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="grid">{renderArrCard(props.cards)}</section>
    </>
  );
}

export default Main;
