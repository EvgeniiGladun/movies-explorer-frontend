import React from 'react'
import './Portfolio.css';

function Portfolio() {
    return (
        <section className='portfolio'>
            <div className='portfolio__container'>
                <div className='portfolio-links'>
                    <h4 className='portfolio-links__name'>Портфолио</h4>
                    <ul className='portfolio-links__items'>
                        <li className='portfolio-links__item'>
                            <a href='https://evgeniigladun.github.io/release-how-to-learn/' className='portfolio-links__link' target='_blank' rel='noreferrer'>Статичный сайт</a>
                            <h4 className='portfolio-links__link-arrow'>&#8599;</h4>
                        </li>
                        <li className='portfolio-links__item'>
                            <a href='https://evgeniigladun.github.io/REACT-MESTO-AUTH/' className='portfolio-links__link' target='_blank' rel='noreferrer'>Адаптивный сайт</a>
                            <h4 className='portfolio-links__link-arrow'>&#8599;</h4>
                        </li>
                        <li className='portfolio-links__item'>
                            <a href='https://photograms.nomoredomainsclub.ru/' className='portfolio-links__link portfolio-links__link_disabled' target='_blank' rel='noreferrer'>Одностраничное приложение</a>
                            <span className='portfolio-links__span portfolio-links__span_color'>* временно не работает</span>
                            <h4 className='portfolio-links__link-arrow portfolio-links__link-arrow_disabled'>&#8599;</h4>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Portfolio;