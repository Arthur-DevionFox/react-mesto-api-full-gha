import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext)

    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(i => i === currentUser._id);

    const cardDeleteButtonClassName = (
        `element__delete ${isOwn ? 'element__delete_visible' : ''}`
    );

    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : ''}`
    );

    function handleClick() {
        props.onCardClick(props.card)
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
        console.log('click')
    }


    return (
        <div className={"element"}>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <img src={props.link} alt={props.name} className={"element__image"} onClick={handleClick}/>
            <div className={"element__info"}>
                <h2 className={"element__paragraph"}>{props.name}</h2>
                <div className={"element__likes"}>
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <label className={"element__like-info"}>
                        <p className={"element__counter"}>{props.likes}</p>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Card