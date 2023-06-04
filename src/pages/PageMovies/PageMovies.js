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
                                    hendlerMoviesLike={props.hendlerMoviesLike}
                                    handleAddPlaceSubmit={props.handleAddPlaceSubmit}
                                    key={movie.id}
                                    {...movie}
                                />
                            )
                        }) : []
                }
            </ Layout>
        </>
    )
}

export default PageMovies