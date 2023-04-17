import React from 'react'
import Layout from '../../components/Layout/Layout'

function PageSaveMovies(props) {

    return (
        <>
            <Layout
                preloader={props.preloader}
                getMoviesList={props.getMoviesList}
            >
                <div className='card'>
                    <img className='card__afisha' src={props.previewUrl} alt={props.title} />
                    <div className='card__discription'>
                        <h3 className='card__title'>{props.title}</h3>
                        <button onClick={() => { console.log('Запрос на удлаение отправлен') }} className='card__delete-btn'>
                            <span className='card__delete-cross'>+</span>
                        </button>
                    </div>
                    <span className='card__duration-film'>{props.duration}</span>
                </div>
            </ Layout>
        </>
    )
}

export default PageSaveMovies