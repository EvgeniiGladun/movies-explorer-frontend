import React from 'react'
import Layout from '../../components/Layout/Layout'

function PageSaveMovies() {

    return (
        <>
            <Layout>
                <div className='card'>
                    <img className='card__afisha' src="https://cdn.ananasposter.ru/image/cache/catalog/poster/film/82/13033-1000x830.jpg" alt="Афиша фильма" />
                    <div className='card__discription'>
                        <h3 className='card__title'>Fast And Furious Movie</h3>
                        <button onClick={() => { console.log('Запрос на удлаение отправлен') }} className='card__delete-btn'>
                            <span className='card__delete-cross'>+</span>
                        </button>
                    </div>
                    <span className='card__duration-film'>2ч 42м</span>
                </div>
                <div className='card'>
                    <img className='card__afisha' src="https://cdn.ananasposter.ru/image/cache/catalog/poster/film/82/13033-1000x830.jpg" alt="Афиша фильма" />
                    <div className='card__discription'>
                        <h3 className='card__title'>Fast And Furious Movie</h3>
                        <button onClick={() => { console.log('Запрос на удлаение отправлен') }} className='card__delete-btn'>
                            <span className='card__delete-cross'>+</span>
                        </button>
                    </div>
                    <span className='card__duration-film'>2ч 42м</span>
                </div>
            </ Layout>
        </>
    )
}

export default PageSaveMovies