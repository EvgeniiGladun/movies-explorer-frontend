import React from 'react'
import { useLocation } from 'react-router-dom';
import './Layout.css';
import SearchForm from '../Movies/SearchForm/SearchForm'

function Layout(props) {

    const currentLocation = useLocation().pathname.toLocaleLowerCase() === '/pagemovies';

    return (
        <>
            <SearchForm />
            <main className='cards'>
                {props.children}
            </main>

            {currentLocation ? <div className='cards-next'>
                <button className='cards-next__btn-next'>Ещё</button>
            </div> : ''}
        </>
    )
}

export default Layout