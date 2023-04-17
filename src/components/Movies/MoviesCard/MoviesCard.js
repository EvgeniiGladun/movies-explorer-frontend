import React from 'react'
import './MoviesCard.css';
const IMG_URL = 'https://api.nomoreparties.co';

function MoviesCard(props) {

    const checkLike = (evt) => {
        return evt.target.firstChild
            ? evt.target.firstChild.classList.toggle('card__like-heart-active')
            : evt.target.classList.toggle('card__like-heart-active');
    }

    return (
        <>
            <div className='card'>
                <a href={props.trailerLink} target="_blank">
                    <img className='card__afisha' src={`${IMG_URL}/${props.image.url}`} alt={props.nameRU} preserveAspectRatio='xMidYMid slice' />
                </a>
                <div className='card__discription'>
                    <h3 className='card__title'>{props.nameRU}</h3>
                    <button onClick={checkLike} className='card__like-btn'>
                        <div className='card__like-heart'></div>
                    </button>
                </div>
                <span className='card__duration-film'>{props.duration}</span>
            </div>
        </>
    )
}

export default MoviesCard