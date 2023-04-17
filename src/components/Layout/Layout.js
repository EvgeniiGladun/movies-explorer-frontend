import './Layout.css';
import React from 'react'
import { useLocation } from 'react-router-dom';
import SearchForm from '../Movies/SearchForm/SearchForm'
import Preloader from '../Movies/Preloader/Preloader';

function Layout(props) {

    const currentLocation = useLocation().pathname.toLocaleLowerCase() === '/pagemovies';

    return (
        <>
            <SearchForm
                usersSearchRequest={props.usersSearchRequest}
            />
            {props.preloader
                ? <Preloader />
                : <section className={`cards ${props.showBlockCards ? '' : 'cards_block_hide'}`}>
                    {props.children}
                </section>}

            {
                currentLocation
                    ? <div className='cards-next cards-next_block_hide'>
                        <button className='cards-next__btn-next'>Ещё</button>
                    </div>
                    : ''
            }
        </>
    )
}

export default Layout