import React from 'react'
import './AboutProject.css';


function AboutProject() {
    return (
        <section id='about-project' className='about-project'>
            <div className='about-project__container'>

                <h2 className='about-project__title'>О проекте</h2>
                <div className='about-project__discription-container'>

                    <div className='about-project__discription'>
                        <h3 className='about-project__discription-title'>Дипломный проект включал 5 этапов</h3>
                        <h4 className='about-project__discription-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</h4>
                    </div>
                    <div className='about-project__discription'>
                        <h3 className='about-project__discription-title'>На выполнение диплома ушло 5 недель</h3>
                        <h4 className='about-project__discription-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</h4>
                    </div>
                </div>

                <div className='about-project__line-container'>

                    <div className='about-project__line'>
                        <div className='about-project__line-green'>
                            <p className='about-project__line-text about-project__line-text_color_black'>1 неделя</p>
                        </div>
                        <h4 className='about-project__line-discription'>Back-end</h4>
                    </div>
                    <div className='about-project__line'>
                        <div className='about-project__line-black'>
                            <p className='about-project__line-text'>4 недели</p>
                        </div>
                        <h4 className='about-project__line-discription'>Front-end</h4>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;