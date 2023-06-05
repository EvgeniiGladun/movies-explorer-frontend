import { React, useState, useEffect, useCallback } from 'react'
import Layout from '../../components/Layout/Layout'
import MoviesCard from '../../components/Movies/MoviesCard/MoviesCard'
import { firstMovies, nextStep } from '../../utils/constants';

function PageMovies(props) {

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
    }, [props.moviesList, screenWidth]);

    useEffect(() => {
        setMoreButton(paginator < props.moviesList.length);
    }, [showMovies]);

    const showFirstMovies = () => {
        setNumberOfFirstMovies(screenWidth > 1279 ? firstMovies.large : screenWidth > 954 ? firstMovies.medium : screenWidth > 768 ? firstMovies.small : firstMovies.smallest);

        setPaginator(numberOfFirstMovies);
        setShowMovies(props.moviesList.slice(0, numberOfFirstMovies));
    }

    const showMoreMovies = () => {
        setStep(screenWidth > 1279 ? nextStep.large : screenWidth > 954 ? nextStep.medium : nextStep.small);

        let nextStepArr = props.moviesList.splice(paginator, step);
        setShowMovies(showMovies.concat(nextStepArr));
        setPaginator(paginator + step);
    }

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