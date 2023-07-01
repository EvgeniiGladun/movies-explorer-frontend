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
                        <h2 className='aboutme__biography-name'>Евгений</h2>
                        <h3 className='aboutme__biography-specialization'>Фронтенд-разработчик, 25 лет</h3>
                        <p className='aboutme__biography-description'>Я живу в Екатеринбурге, закончил обучение Фронтенд-разработчика. Я люблю слушать музыку, а ещё увлекаюсь силовым видом спорта. 1.5 года уже занимаюсь разработкой проектов. С 2018 года работал в компании Связной дежурным инженером, потом перешёл в компанию <span className='aboutme__biography-description_text_green'>OnlinePBX</span>. После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами.</p>
                        <a href='https://github.com/EvgeniiGladun' className='aboutme__biography-link' target='_blank' rel='noreferrer'>Github</a>
                    </div>
                    <img className='aboutme__biography-photo' src={userPhoto} alt='Фотография' />
                </div>
            </div>
        </section>
    )
}

export default AboutMe;