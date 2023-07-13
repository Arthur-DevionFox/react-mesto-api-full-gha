import React from "react";

function ImagePopup(props) {
    return (
        <div className={`popup popup_img ${props.card ? 'popup_opened' : ''}`} id="image" onClick={props.onCloseClick}>
            <div className={"popup__container-big-img"}>
                <figure className={"popup__figure"}>
                    <img className={"popup__image"} src={props.card ? props.card.link : ''}
                         alt={props.card ? props.card.name : ''}/>
                    <figcaption className={"popup__undertaker"}
                                id="undertaker">{props.card ? props.card.name : ''}</figcaption>
                </figure>
                <button type="button" className={"popup__close"} id="img-close" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup