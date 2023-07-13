import React from "react";

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened` : ""}`} id={props.id}
             onClick={props.onCloseClick}>
            <div className={"popup__container"}>
                <h2 className={"popup__paragraph"}>{props.title}</h2>
                <form className={"popup__form"} id={props.id} onSubmit={props.onSubmit} noValidate>
                    {props.children}
                    <button className={"popup__submit"} type={"submit"}>{props.buttonText}</button>
                </form>
                <button type={"button"} className={"popup__close"} id={"close-edit"} onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm