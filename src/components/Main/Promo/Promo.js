import React from 'react'
import './Promo.css';
import globusLogo from '../../../images/promo/landing-logo.svg';

function Promo() {
    return (
        <>
            <section className='promo'>
                <div className='promo__container'>

                    <div className='promo__info'>
                        <h1 className='promo__title'>Учебный проект студента факультета <span className='promo__title-continued'>Веб-разработки.</span></h1>
                        <h3 className='promo__discription'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</h3>
                    </div>

                    <img className='promo__logo' src={globusLogo} alt='Глобус' />
                </div>

                <div className='promo__btn-detailed'>
                    <a href='#about-project' className='promo__btn-link'>Узнать больше</a>
                </div>
            </section>
        </>
    )
}

export default Promo;