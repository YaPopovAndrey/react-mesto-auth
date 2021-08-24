import React from "react";

function ImagePopup(props) {
  console.log(props);
  return (
    <div className={`popup popup_place_photo ${props.card && "popup_opened"}`}>
      <div className="popup__popup-close" onClick={props.onClose} />
      <div className="popup__photo-container">
        <img
          className="popup__photo"
          alt={props.card && props.card.name}
          src={props.card && props.card.link}
        />
        <h2 className="popup__name-photo">{props.card && props.card.name}</h2>
        <button
          type="button"
          className="popup__close popup__close_place_photo"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
