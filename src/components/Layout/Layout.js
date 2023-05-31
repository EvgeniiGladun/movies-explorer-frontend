import './Layout.css';
import { React, useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import SearchForm from '../Movies/SearchForm/SearchForm'
import Preloader from '../Movies/Preloader/Preloader';

function Layout(props) {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const handleResize = useCallback(() => {
        setScreenWidth(window.innerWidth);
    }, [])
    const currentLocation = useLocation().pathname.toLocaleLowerCase() === '/pagemovies';

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    return (
        <>
            <SearchForm
                usersSearchRequest={props.usersSearchRequest}
            />
            {
                props.preloader
                    ? <Preloader />
                    : props.moviesList.length !== 0 ? <section className={`cards ${props.showBlockCards
                        ? ''
                        : 'cards_block_hide'}`}>
                        {props.children}
                    </section>
                        :
                        props.getErrorMovies ? <div className={`nothing-found ${props.showBlockCards ? '' : 'nothing-found_hide'}`}>
                            <span className='nothing-found__text_error'>Во время запроса произошла ошибка.</span>
                            <span className='nothing-found__text_error'>Возможно, проблема с соединением или сервер недоступен.</span>
                            <span className='nothing-found__text_error'>Подождите немного и попробуйте ещё раз.</span>
                        </div>
                            : <div className={`nothing-found ${props.showBlockCards ? '' : 'nothing-found_hide'}`}>
                                <span className='nothing-found__text_error'>Ничего не найдено</span>
                            </div>
            }

            {
                <div className='cards-next cards-next_block_hide'>
                    <button className='cards-next__btn-next'>Ещё</button>
                </div>
            }
        </>
    )
}

export default Layout