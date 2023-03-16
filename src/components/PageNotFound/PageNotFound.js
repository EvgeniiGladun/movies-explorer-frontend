import React from 'react'
import './PageNotFound.css';
import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div className="not-found">
            <h3 className="not-found__title">
                <span className='not-found__error'>404</span>
                <span className='not-found__text'>Страница не найдена</span>
            </h3>
            <Link className="button button_type_to-main" to="/">Назад</Link>
        </div>
    )
}

export default PageNotFound