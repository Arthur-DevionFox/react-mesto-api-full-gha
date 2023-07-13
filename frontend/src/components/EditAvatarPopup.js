import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const ref = React.useRef()

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onSubmit({
            avatar: ref.current.value
        });
    }

    React.useEffect(() => {
        ref.current.value = '';
    }, [props.isOpen]);

    return (<PopupWithForm
        title={'Обновить аватар'}
        name={'avatar'}
        id={'avatar'}
        isOpen={props.isOpen}
        onClose={props.onClose}
        onCloseClick={props.onCloseClick}
        buttonText={'Сохранить'}
        onSubmit={handleSubmit}
    >
        <input ref={ref} id="avatar_link" className={"popup__input popup__input_type_avatar"} placeholder="Ссылка"
               type="url" name="avatar" required/>
        <span className={"popup__input-error input-link-error"}></span>
    </PopupWithForm>)
}

export default EditAvatarPopup