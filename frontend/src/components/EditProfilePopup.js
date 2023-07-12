import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function EditProfilePopup(props) {

    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const currentUser = React.useContext(CurrentUserContext)

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onSubmit({
            name: name,
            about: description
        });
    }

    React.useEffect(() => {
        if (props.isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [props.isOpen, currentUser]);

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onCloseClick={props.onCloseClick}
            onClose={props.onClose}
            name={'edit'}
            form={'profileData'}
            title={'Редактировать профиль'}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}
        >
            <input id={"name"} className={"popup__input popup__input_type_name"} onChange={handleNameChange}
                   placeholder={"Введите имя"} minLength="2" maxLength="40" type={"text"} value={name} required/>
            <span className={"popup__input-error input-name-error"}></span>
            <input id={"about"} className={"popup__input popup__input_type_profession"}
                   onChange={handleDescriptionChange} placeholder={"Введите род деятельности"} minLength="2"
                   maxLength="200" value={description} name={"description"} required/>
            <span className={"popup__input-error input-profession-error"}></span>
        </PopupWithForm>)
}

export default EditProfilePopup