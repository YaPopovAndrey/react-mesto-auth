import React from "react";
import { useHistory } from "react-router-dom";
import imgOk from "../images/Union.svg";
import imgError from "../images/UnionError.png";

function InfoTooltip(props) {
  const history = useHistory();
  function closePopup() {
    if (props.registrationStatus) {
      props.onClose();
      history.push("/sign-in");
    } else {
      props.onClose();
    }
  }

  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__popup-close" onClick={closePopup} />
      <div className="popup__content popup__content_place_info">
        <img
          src={props.registrationStatus ? imgOk : imgError}
          className="popup__info-photo"
        ></img>
        <button type="button" className="popup__close" onClick={closePopup} />
        <h3 className="popup__title popup__title_place_info">
          {props.registrationStatus
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
