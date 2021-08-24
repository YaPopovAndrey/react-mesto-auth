import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [newPlaceName, setNewPlaceName] = React.useState("");
  const [newPlaceLink, setNewPlaceLink] = React.useState("");

  const handlePlaceName = (e) => {
    setNewPlaceName(e.target.value);
  };

  const handlePlaceLink = (e) => {
    setNewPlaceLink(e.target.value);
  };

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.setNewCard({
      name: newPlaceName,
      link: newPlaceLink,
    });
    resetInputPopupAdd();
  }

  function resetInputPopupAdd() {
    setNewPlaceName("");
    setNewPlaceLink("");
  }

  function onClose() {
    props.onClose();
    resetInputPopupAdd();
  }

  return (
    <PopupWithForm
      name="place_add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <div className="popup__input-form">
        <input
          placeholder="Название"
          id="title-input"
          className="popup__input popup__input_type_name-add"
          name="mesto"
          required
          value={newPlaceName}
          minLength={2}
          maxLength={30}
          onChange={handlePlaceName}
        />
        <span
          className="popup__input-error input-error"
          id="title-input-error"
        />
      </div>
      <div className="popup__input-form">
        <input
          placeholder="Ссылка на картинку"
          id="url-input"
          className="popup__input popup__input_type_photo-add"
          name="photo"
          type="url"
          value={newPlaceLink}
          required
          onChange={handlePlaceLink}
        />
        <span className="popup__input-error input-error" id="url-input-error" />
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
