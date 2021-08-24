import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div className="popup__popup-close" onClick={props.onClose} />
      <div className="popup__content">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        />
        <h3 className="popup__title">{props.title}</h3>
        <form
          className="popup__form popup__form-editing"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}

          <button type="submit" className="popup__save">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
