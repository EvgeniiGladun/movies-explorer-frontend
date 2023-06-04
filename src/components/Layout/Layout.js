import './Layout.css';
import { React, useState, useCallback, useEffect, Children } from 'react';
import { useLocation } from 'react-router-dom';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Preloader from '../Movies/Preloader/Preloader';
import { shortMovieDuration, firstMovies, nextStep } from '../../utils/constants';

function Layout(props) {

    const children = Children.toArray(props.children);
    const locationPageMovies = useLocation().pathname.toLocaleLowerCase() === '/pagemovies';

    const [moreButton, setMoreButton] = useState(false);
    const [findedMovies, setFindedMovies] = useState({});
    const [step, setStep] = useState(0);
    const [numberOfFirstMovies, setNumberOfFirstMovies] = useState(0);
    const [showMovies, setShowMovies] = useState([]);
    const [paginator, setPaginator] = useState();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const handleResize = useCallback(() => {
        setScreenWidth(window.innerWidth);
    }, [])

    console.log(screenWidth)

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    useEffect(() => {
        showFirstMovies();
    }, [findedMovies]);

    useEffect(() => {
        setMoreButton(paginator < findedMovies.length);
    }, [showMovies]);

    const showFirstMovies = () => {
        setNumberOfFirstMovies(screenWidth > 1279 ? firstMovies.large : screenWidth > 954 ? firstMovies.medium : screenWidth > 768 ? firstMovies.small : firstMovies.smallest);

        setPaginator(numberOfFirstMovies);
        setShowMovies(Array.from(findedMovies).slice(0, numberOfFirstMovies));
    }

    const showMoreMovies = () => {
        setStep(screenWidth > 1279 ? nextStep.large : screenWidth > 954 ? nextStep.medium : nextStep.small);

        let nextStepArr = Array.from(findedMovies).splice(paginator, step);
        setShowMovies(showMovies.concat(nextStepArr));
        setPaginator(paginator + step);
    }

    return (
        <>
            <SearchForm
                usersSearchRequest={props.usersSearchRequest}
            />
            {
                props.preloader
                    ? <Preloader />
                    : <section className={`cards${props.showBlockCards || !locationPageMovies
                        ? ''
                        : 'cards_block_hide'}`}>
                        {props.children}
                    </section>
            }
            {/* {
                props.getErrorMovies ? <div className={`nothing-found ${props.showBlockErr ? '' : 'nothing-found_hide'}`}>
                    <span className='nothing-found__text_error'>Во время запроса произошла ошибка.</span>
                    <span className='nothing-found__text_error'>Возможно, проблема с соединением или сервер недоступен.</span>
                    <span className='nothing-found__text_error'>Подождите немного и попробуйте ещё раз.</span>
                </div>
                    : <div className={`nothing-found ${props.showBlockErr ? '' : 'nothing-found_hide'}`}>
                        <span className='nothing-found__text_error'>Ничего не найдено</span>
                    </div>
            } */}

            {
                moreButton && <div className='cards-next'>
                    <button className='cards-next__btn-next' onClick={showMoreMovies}>Ещё</button>
                </div>
            }
        </>
    )
}

export default Layout