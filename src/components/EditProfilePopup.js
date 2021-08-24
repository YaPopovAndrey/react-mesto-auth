import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setNewName(currentUser.name);
    setNewDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const [name, setNewName] = React.useState("");
  const [description, setNewDescription] = React.useState("");

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setNewDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  function onClose() {
    props.onClose();
    resetInputPopupAdd();
  }

  function resetInputPopupAdd() {
    setNewName(currentUser.name);
    setNewDescription(currentUser.about);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <div className="popup__input-form">
          <input
            placeholder="Имя"
            id="name-input"
            className="popup__input popup__input_type_name"
            value={name || ''}
            name="firstname"
            required
            minLength={2}
            maxLength={40}
            autoComplete="off"
            onChange={handleChangeName}
          />
          <span
            className="popup__input-error input-error"
            id="name-input-error"
          />
        </div>
        <div className="popup__input-form">
          <input
            placeholder="Профессия"
            id="description-input"
            className="popup__input popup__input_type_title"
            value={description || ''}
            name="lastname"
            required
            minLength={2}
            maxLength={200}
            onChange={handleChangeDescription}
          />
          <span
            className="popup__input-error input-error"
            id="description-input-error"
          />
        </div>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
