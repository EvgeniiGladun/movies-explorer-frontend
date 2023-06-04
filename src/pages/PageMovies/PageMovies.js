import React from 'react'
import Layout from '../../components/Layout/Layout'
import MoviesCard from '../../components/Movies/MoviesCard/MoviesCard'

function PageMovies(props) {

    return (
        <>
            <Layout
                preloader={props.preloader}
                moviesList={props.moviesList}
                showBlockCards={props.showBlockCards}
                showBlockErr={props.showBlockErr}
                usersSearchRequest={props.usersSearchRequest}
                getErrorMovies={props.getErrorMovies}
            >
                {
                    props.moviesList
                        ? props.moviesList.map((movie) => {
                            return (
                                <MoviesCard
                                    movie={movie}
                                    hendlerMoviesLike={props.hendlerMoviesLike}
                                    handleAddPlaceSubmit={props.handleAddPlaceSubmit}
                                    dataUserMovies={props.dataUserMovies}
                                    key={movie.id}
                                    {...movie}
                                />
                            )
                        }) : []
                }
                {
                    props.getErrorMovies ? <div className={`nothing-found ${props.showBlockErr ? '' : 'nothing-found_hide'}`}>
                        <span className='nothing-found__text_error'>Во время запроса произошла ошибка.</span>
                        <span className='nothing-found__text_error'>Возможно, проблема с соединением или сервер недоступен.</span>
                        <span className='nothing-found__text_error'>Подождите немного и попробуйте ещё раз.</span>
                    </div>
                        : <div className={`nothing-found ${props.showBlockErr ? '' : 'nothing-found_hide'}`}>
                            <span className='nothing-found__text_error'>Ничего не найдено</span>
                        </div>
                }
            </ Layout>
        </>
    )
}

export default PageMovies