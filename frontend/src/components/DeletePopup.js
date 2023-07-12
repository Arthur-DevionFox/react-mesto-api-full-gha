import PopupWithForm from "./PopupWithForm";

function DeletePopup() {
    return (
        <PopupWithForm
            title={'Вы уверены?'}
            name={'delete'}
            id={'delete'}
        >
            <div className={"popup__container popup__container_delete"}>
                <p className={"popup__text"}>Вы уверены?</p>
                <button className={"popup__submit popup__submit_delete"}>Да</button>
                <button type="button" className={"popup__close"} id="delete-close"></button>
            </div>
        </PopupWithForm>
    )
}

export default DeletePopup