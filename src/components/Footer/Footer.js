import React from 'react'
import './Footer.css';

function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className='footer'>
            <div className='footer__container'>
                <h4 className='footer__discription'>Учебный проект Яндекс.Практикум х BeatFilm.</h4>
                <div className='footer__info'>
                    <div className='footer__discriptions footer__discriptions_content_copyright'>
                        <p className='footer__discriptions-years'>&copy; {currentYear}</p>
                    </div>
                    <ul className='footer__discription-items'>
                        <li className='footer__discription-item'>
                            <a href='https://practicum.yandex.ru/' className='footer__discription-link' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
                        </li>
                        <li className='footer__discription-item'>
                            <a href='https://github.com/EvgeniiGladun' className='footer__discription-link' target='_blank' rel='noreferrer'>Github</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;