import React from 'react'
import Layout from '../../components/Layout/Layout'
import MoviesCard from '../../components/Movies/MoviesCard/MoviesCard'

function PageMovies(props) {

    return (
        <>
            <Layout
                preloader={props.preloader}
                showBlockCards={props.showBlockCards}
                usersSearchRequest={props.usersSearchRequest}
            >
                {
                    props.moviesList ? props.moviesList.map((movie) => {

                        return (
                            <MoviesCard
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