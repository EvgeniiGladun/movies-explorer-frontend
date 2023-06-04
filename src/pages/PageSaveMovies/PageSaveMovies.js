import { React, useState, useEffect, useCallback } from 'react'
import Layout from '../../components/Layout/Layout';
import MoviesCard from '../../components/Movies/MoviesCard/MoviesCard';
import { firstMovies, nextStep } from '../../utils/constants';

function PageSaveMovies(props) {

    const [moreButton, setMoreButton] = useState(false);
    const [step, setStep] = useState(0);
    const [numberOfFirstMovies, setNumberOfFirstMovies] = useState(0);
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
    }, [props.dataUserMovies, screenWidth]);

    useEffect(() => {
        setMoreButton(paginator < props.dataUserMovies.length);
    }, [showMovies]);

    const showFirstMovies = () => {
        setNumberOfFirstMovies(screenWidth > 1279 ? firstMovies.large : screenWidth > 954 ? firstMovies.medium : screenWidth > 768 ? firstMovies.small : firstMovies.smallest);

        setPaginator(numberOfFirstMovies);
        setShowMovies(props.dataUserMovies.slice(0, numberOfFirstMovies));
    }

    const showMoreMovies = () => {
        const s = screenWidth > 1279 ? nextStep.large : screenWidth > 954 ? nextStep.medium : nextStep.small;
        setStep(s);
        let nextStepArr = props.dataUserMovies.slice(paginator, s);
        setShowMovies(showMovies.concat(nextStepArr));
        setPaginator(paginator + step);
    }

    return (
        <>
            <Layout
                preloader={props.preloader}
                dataUserMovies={props.dataUserMovies}
                getErrorMovies={props.getErrorMovies}
                showBlockErr={props.showBlockErr}
                usersSearchRequest={props.usersSearchRequest}
                showBlockCards={props.showBlockCards}
                showMoreMovies={showMoreMovies}
                moreButton={moreButton}
            >
                {
                    props.dataUserMovies
                        ? props.dataUserMovies.map((movie) => {
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