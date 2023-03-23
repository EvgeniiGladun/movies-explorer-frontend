import React from 'react'
import './Techs.css';

function Techs() {
    return (
        <section className='techs'>
            <div className='techs__container'>

                <h2 className='techs__title'>Технологии</h2>

                <div className='techs__discriptions-items'>

                    <div className='techs__discription-container'>
                        <div className='techs__discription'>
                            <h2 className='techs__discription-title'>7 технологий</h2>
                            <h4 className='techs__discription-text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</h4>
                        </div>
                    </div>
                </div>
                <div className='techs__languages-collection'>
                    <div className='techs__languages-item'>
                        <h3 className='techs__languages-text'>HTML</h3>
                    </div>
                    <div className='techs__languages-item'>
                        <h3 className='techs__languages-text'>CSS</h3>
                    </div>
                    <div className='techs__languages-item'>
                        <h3 className='techs__languages-text'>JS</h3>
                    </div>
                    <div className='techs__languages-item'>
                        <h3 className='techs__languages-text'>React</h3>
                    </div>
                    <div className='techs__languages-item'>
                        <h3 className='techs__languages-text'>Git</h3>
                    </div>
                    <div className='techs__languages-item'>
                        <h3 className='techs__languages-text'>Express.js</h3>
                    </div>
                    <div className='techs__languages-item'>
                        <h3 className='techs__languages-text'>mongoDB</h3>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Techs;