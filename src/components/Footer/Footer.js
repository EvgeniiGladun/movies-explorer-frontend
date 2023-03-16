import React from 'react'
import './Footer.css';

function Footer() {

    return (
        <footer className='footer'>
            <div className="footer__container">
                <h4 className='footer__discription'>Учебный проект Яндекс.Практикум х BeatFilm.</h4>
                <div className='footer__info'>
                    <div className='footer__discription_content_copyright'>
                        <p>&copy; 2023</p>
                    </div>
                    <ul className='footer__discription-items'>
                        <li className='footer__discription-item'>
                            <a href="/" className='footer__discription-link'>Яндекс.Практикум</a>
                        </li>
                        <li className='footer__discription-item'>
                            <a href="/" className='footer__discription-link'>Github</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;