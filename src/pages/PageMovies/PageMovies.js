import { React, useState, useEffect, useCallback } from 'react'
import Layout from '../../components/Layout/Layout'
import MoviesCard from '../../components/Movies/MoviesCard/MoviesCard'
import { firstMovies, nextStep } from '../../utils/constants';

function PageMovies(props) {

    const [moreButton, setMoreButton] = useState(false);
    const [showMovies, setShowMovies] = useState([]);
    const [paginator, setPaginator] = useState();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const handleResize = useCallback(() => {
        setScreenWidth(window.innerWidth);
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    useEffect(() => {
        showFirstMovies();
    }, [props.moviesList, screenWidth]);

    useEffect(() => {
        setMoreButton(paginator < props.moviesList.length);
    }, [showMovies]);

    const showFirstMovies = () => {
        const firstMoviesCount =
            screenWidth > 1279
                ? firstMovies.large
                : screenWidth > 954
                    ? firstMovies.medium
                    : screenWidth > 768
                        ? firstMovies.small
                        : firstMovies.smallest;

        setPaginator(firstMoviesCount);
        setShowMovies(props.moviesList.slice(0, firstMoviesCount));
    }

    const showMoreMovies = () => {
        const additionalMoviesCount =
            screenWidth > 1279
                ? nextStep.large
                : screenWidth > 954
                    ? nextStep.medium
                    : screenWidth > 768
                        ? nextStep.small
                        : nextStep.smallest;

        const nextPaginator = paginator + additionalMoviesCount;
        setShowMovies(props.moviesList.slice(0, nextPaginator));
        setPaginator(nextPaginator);
    };

    return (
        <>
            <Layout
                requestUserSerch={props.requestUserSerch}
                preloader={props.preloader}
                moviesList={props.moviesList}
                showBlockCards={props.showBlockCards}
                showBlockErr={props.showBlockErr}
                usersSearchRequest={props.usersSearchRequest}
                getErrorMovies={props.getErrorMovies}
                showMoreMovies={showMoreMovies}
                moreButton={moreButton}
            >
                {
                    props.moviesList
                        ? showMovies.map((movie) => {
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
            </ Layout>
        </>
    )
}

export default PageMovies