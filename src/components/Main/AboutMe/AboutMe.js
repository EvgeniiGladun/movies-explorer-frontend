import React from 'react'
import userPhoto from '../../../images/aboutme/photo.jpg';
import './AboutMe.css';

function AboutMe() {
    return (
        <section className='aboutme'>
            <div className='aboutme__container'>
                <h3 className='aboutme__title'>Студент</h3>

                <div className='aboutme__info'>
                    <div className='aboutme__biography'>
                        <h2 className='aboutme__biography-name'>Виталий</h2>
                        <h3 className='aboutme__biography-specialization'>Фронтенд-разработчик, 30 лет</h3>
                        <p className='aboutme__biography-description'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                        <a href='https://github.com/EvgeniiGladun' className='aboutme__biography-link' target='_blank' rel='noreferrer'>Github</a>
                    </div>
                    <img className='aboutme__biography-photo' src={userPhoto} alt='Фотография' />
                </div>
            </div>
        </section>
    )
}

export default AboutMe;