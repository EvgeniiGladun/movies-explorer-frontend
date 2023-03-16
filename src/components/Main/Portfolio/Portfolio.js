import React from 'react'
import link from '../../../images/portfolio/link/linkImg.svg';
import './Portfolio.css';

function Portfolio() {
    return (
        <section className='portfolio'>
            <div className='portfolio__container'>
                <div className='portfolio-links'>
                    <h4 className='portfolio-links__name'>Портфолио</h4>
                    <ul className='portfolio-links__items'>
                        <li className='portfolio-links__item'>
                            <a href='/' className='portfolio-links__link'>Статичный сайт</a>
                            <img className='portfolio-links__link-img' src={link} alt='Ссылка' />
                        </li>
                        <li className='portfolio-links__item'>
                            <a href='/' className='portfolio-links__link'>Адаптивный сайт</a>
                            <img className='portfolio-links__link-img' src={link} alt='Ссылка' />
                        </li>
                        <li className='portfolio-links__item'>
                            <a href='/' className='portfolio-links__link'>Одностраничное приложение</a>
                            <img className='portfolio-links__link-img' src={link} alt='Ссылка' />
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Portfolio;