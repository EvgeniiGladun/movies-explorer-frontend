import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
const IMG_URL = 'https://api.nomoreparties.co';

function MoviesCard({ hendlerMoviesLike, ...props }) {
    const location = useLocation();
    const [duration, setDuratiion] = useState('');
    const showCross = ['/pagesavemovies'].includes(location.pathname);

    useEffect(() => {
        timeDuration();
    }, [])

    const timeDuration = () => {
        let hour = Math.floor(props.duration / 60) + ' ч';
        if (Math.floor(props.duration / 60) === 0) {
            hour = '';
        }
        let min = (props.duration % 60) + ' мин';
        setDuratiion(`${hour} ${min}`);
    }

    const checkLike = (evt) => {
        return evt.target.firstChild
            ? evt.target.firstChild.classList.toggle('card__like-heart-active')
            : evt.target.classList.toggle('card__like-heart-active');
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
                            ? <button onClick={() => { console.log('Запрос на удлаение отправлен') }} className='card__delete-btn'>
                                <span className='card__delete-cross'>+</span>
                            </button>
                            : <button onClick={hendlerMoviesLike} className='card__like-btn'>
                                <div className='card__like-heart'></div>
                            </button>
                    }
                </div>
                <span className='card__duration-film'>{duration}</span>
            </div>
        </>
    )
}

export default MoviesCard