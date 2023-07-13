import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onSubmit({
            name: name,
            link: link
        });
    }

    React.useEffect(() => {
        if (props.isOpen) {
            setName('');
            setLink('');
        }
    }, [props.isOpen]);

    return (
        <PopupWithForm
            title={'Создать место'}
            name={'name'}
            id={'add'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onCloseClick={props.onCloseClick}
            buttonText={'Создать'}
            onSubmit={handleSubmit}
        >
            <input id={"input-title"} value={name} className={"popup__input popup__input_type_head"} minLength="2"
                   maxLength="30" placeholder="Название" type="text" name="name" onChange={handleNameChange} required/>
            <span className={"popup__input-error input-title-error"}></span>
            <input id={"input-url"} value={link} className={"popup__input popup__input_type_url"}
                   placeholder="Ссылка на картинку" type="url" name="link" onChange={handleLinkChange} required/>
            <span className={"popup__input-error input-url-error"}></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup