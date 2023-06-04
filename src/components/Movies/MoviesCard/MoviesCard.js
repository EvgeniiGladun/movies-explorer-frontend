import { userContex } from '../../../contexts/CurrentUserContext';

import { React, useState, useEffect, useContext, useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
const IMG_URL = 'https://api.nomoreparties.co';

function MoviesCard({ movie, card, dataUserMovies, hendlerMoviesDelete, hendlerMoviesLike, ...props }) {
    const location = useLocation();
    const currentUser = useContext(userContex);
    const [duration, setDuratiion] = useState('');
    const showCross = ['/pagesavemovies'].includes(location.pathname);

    useEffect(() => {
        timeDuration();
    }, [])

    const isLiked = useMemo(() => {
        return !!dataUserMovies?.some((i) => i.movieId === movie.id);
    }, [dataUserMovies, movie])

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const moviesLikeButton = (
        `card__like-heart ${isLiked ? 'card__like-heart-active' : ''}`
    );

    function handleLikeClick(evt) {
        // Проверяем окрас лайка
        evt.target.firstChild
            ? evt.target.firstChild.classList.toggle('card__like-heart-active')
            : evt.target.classList.toggle('card__like-heart-active');
        hendlerMoviesLike(props, !isLiked);
    }

    function handleDeleteClick() {
        hendlerMoviesDelete(props);
    }

    const timeDuration = () => {
        let hour = Math.floor(props.duration / 60) + ' ч';
        if (Math.floor(props.duration / 60) === 0) {
            hour = '';
        }
        let min = (props.duration % 60) + ' мин';
        setDuratiion(`${hour} ${min}`);
    }

    return (
        <>
            <div className='card'>
                <a href={props.trailerLink} target="_blank">
                    <img className='card__afisha' src={showCross ? `${props.image}` : `${IMG_URL}/${props.image.url}`} alt={props.nameRU} preserveAspectRatio='xMidYMid slice' />
                </a>
                <div className='card__discription'>
                    <h3 className='card__title'>{props.nameRU}</h3>
                    {
                        showCross
                            ? <button onClick={handleDeleteClick} className='card__delete-btn'>
                                <span className='card__delete-cross'>+</span>
                            </button>
                            : <button onClick={handleLikeClick} className='card__like-btn'>
                                <div className={moviesLikeButton}></div>
                            </button>
                    }
                </div>
                <span className='card__duration-film'>{duration}</span>
            </div>
        </>
    )
}

export default MoviesCard