import { React, useState, useEffect, useCallback } from 'react'
import { firstMovies, nextStep } from '../../utils/constants';
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
                        ? showMovies.map((movie) => {
                            return (
                                <MoviesCard
                                    movie={movie}
                                    hendlerMoviesLike={props.hendlerMoviesLike}
                                    handleAddPlaceSubmit={props.handleAddPlaceSubmit}
                                    hendlerMoviesDelete={props.hendlerMoviesDelete}
                                    dataUserMovies={props.dataUserMovies}
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