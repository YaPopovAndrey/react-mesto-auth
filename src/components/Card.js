import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `grid__delete ${
    isOwn && "grid__delete_opened"
  }`;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `grid__like-button ${
    isLiked && "grid__button_active"
  }`;

  function handleClick() {
    props.onCardClick({
      link: props.card.link,
      name: props.card.name,
    });
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="grid__element">
      <button
        className={cardDeleteButtonClassName}
        aria-label="delete"
        type="button"
        onClick={handleDeleteClick}
      />
      <img
        className="grid__photo"
        src={props.card.link}
        onClick={handleClick}
      />
      <div className="grid__info">
        <h2 className="grid__name">{props.card.name}</h2>
        <div className="gride__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="like"
            onClick={handleLikeClick}
          />
          <p className="grid__like-kolvo">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
