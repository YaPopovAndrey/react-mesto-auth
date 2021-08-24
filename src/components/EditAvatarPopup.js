import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });

    avatarRef.current.value = "";
  }

  function onClose() {
    props.onClose();
    avatarRef.current.value = "";
  }

  return (
    <PopupWithForm
      name="new-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-form">
        <input
          placeholder="Ссылка на новую фотографию"
          id="new-avatar-input"
          className="popup__input popup__input_type_name-add"
          name="avatar"
          type="url"
          noValidate
          required
          ref={avatarRef}
        />
        <span
          className="popup__input-error input-error"
          id="new-avatar-input-error"
        />
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
