import React from 'react'
import './Profile.css';

function Profile(props) {

    const submitFormUser = (evt) => {
        evt.preventDefault();
        alert('Данные отправлены на сервер');

    }

    return (
        <section className='profile'>

            <div className='profile__container'>
                <h2 className='profile__greeting'>{`${props.greeting}, ${props.userName}!`}</h2>

                <form onSubmit={submitFormUser} className='profile__form'>
                    <div className='profile__form-input__container'>
                        <label className='profile__form-label'>Имя</label>
                        <input className='profile__form-input profile__form_user_name' id='input-name' type="text" placeholder='Ваше имя' defaultValue={props.userName} required />
                    </div>
                    <div className='profile__form-input__container'>
                        <label className='profile__form-label'>E-mail</label>
                        <input className='profile__form-input profile__form_user_email' id='input-email' type="email" placeholder='Ваша почта' defaultValue={props.userEmail} required />
                    </div>

                    <button className='profile__btn profile__btn-form'>{props.btnEditText}</button>
                </form>
                <button className='profile__btn profile__btn-exit'>{props.btnExitText}</button>
            </div>

        </section>
    )
}

export default Profile