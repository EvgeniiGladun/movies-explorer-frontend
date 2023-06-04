import React from 'react';
import Layout from '../../components/Layout/Layout';
import MoviesCard from '../../components/Movies/MoviesCard/MoviesCard';

function PageSaveMovies(props) {

    return (
        <>
            <Layout
                preloader={props.preloader}
                dataUserMovies={props.dataUserMovies}
                getErrorMovies={props.getErrorMovies}
                showBlockErr={props.showBlockErr}
                usersSearchRequest={props.usersSearchRequest}
                showBlockCards={props.showBlockCards}
            >
                {
                    props.dataUserMovies
                        ? props.dataUserMovies.map((movie) => {
                            return (
                                <MoviesCard
                                    hendlerMoviesLike={props.hendlerMoviesLike}
                                    handleAddPlaceSubmit={props.handleAddPlaceSubmit}
                                    key={movie._id}
                                    {...movie}
                                />
                            )
                        }) : []
                }
            </ Layout>
        </>
    )
}

export default PageSaveMovies