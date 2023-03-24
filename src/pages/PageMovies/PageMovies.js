import React from 'react'
import Layout from '../../components/Layout/Layout'

function PageMovies() {

    const checkLike = (evt) => {
        return evt.target.firstChild
            ? evt.target.firstChild.classList.toggle('card__like-heart-active')
            : evt.target.classList.toggle('card__like-heart-active');
    }

    return (
        <>
            <Layout>
                <div className='card'>
                    <img className='card__afisha' src='https://moviestart.ru/wp-content/uploads/2022/01/kogda-ona-prihodit.jpg' alt='Афиша фильма' preserveAspectRatio='xMidYMid slice' />
                    <div className='card__discription'>
                        <h3 className='card__title'>когда она приходит</h3>
                        <button onClick={checkLike} className='card__like-btn'>
                            <div className='card__like-heart'></div>
                        </button>
                    </div>
                    <span className='card__duration-film'>1ч 42м</span>
                </div>
                <div className='card'>
                    <img className='card__afisha' src='https://moviestart.ru/wp-content/uploads/2022/01/kogda-ona-prihodit.jpg' alt='Афиша фильма' preserveAspectRatio='xMidYMid slice' />
                    <div className='card__discription'>
                        <h3 className='card__title'>когда она приходит</h3>
                        <button onClick={checkLike} className='card__like-btn'>
                            <div className='card__like-heart'></div>
                        </button>
                    </div>
                    <span className='card__duration-film'>1ч 42м</span>
                </div>
                <div className='card'>
                    <img className='card__afisha' src='https://moviestart.ru/wp-content/uploads/2022/01/kogda-ona-prihodit.jpg' alt='Афиша фильма' preserveAspectRatio='xMidYMid slice' />
                    <div className='card__discription'>
                        <h3 className='card__title'>когда она приходит</h3>
                        <button onClick={checkLike} className='card__like-btn'>
                            <div className='card__like-heart'></div>
                        </button>
                    </div>
                    <span className='card__duration-film'>1ч 42м</span>
                </div>
                <div className='card'>
                    <img className='card__afisha' src='https://moviestart.ru/wp-content/uploads/2022/01/kogda-ona-prihodit.jpg' alt='Афиша фильма' preserveAspectRatio='xMidYMid slice' />
                    <div className='card__discription'>
                        <h3 className='card__title'>когда она приходит</h3>
                        <button onClick={checkLike} className='card__like-btn'>
                            <div className='card__like-heart'></div>
                        </button>
                    </div>
                    <span className='card__duration-film'>1ч 42м</span>
                </div>
                <div className='card'>
                    <img className='card__afisha' src='https://moviestart.ru/wp-content/uploads/2022/01/kogda-ona-prihodit.jpg' alt='Афиша фильма' preserveAspectRatio='xMidYMid slice' />
                    <div className='card__discription'>
                        <h3 className='card__title'>когда она приходит</h3>
                        <button onClick={checkLike} className='card__like-btn'>
                            <div className='card__like-heart'></div>
                        </button>
                    </div>
                    <span className='card__duration-film'>1ч 42м</span>
                </div>

            </ Layout>
        </>
    )
}

export default PageMovies