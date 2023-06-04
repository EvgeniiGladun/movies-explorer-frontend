import { userContex } from '../../../contexts/CurrentUserContext';

import { React, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile({ handleNewUserData, onLoggedIn, ...props }) {
    const currentUser = useContext(userContex);
    const navigate = useNavigate();

    function handleSubmit(evt) {
        evt.preventDefault();
        const name = document.getElementById('input-name').value;
        const email = document.getElementById('input-email').value;

        handleNewUserData(name, email);
    }

    // После выхода отрабатывается функция
    const outSite = () => {
        onLoggedIn(false);
        localStorage.clear();
        navigate('/');

    }

    return (
        <section className='profile'>

            <div className='profile__container'>

                <form onSubmit={handleSubmit} className='profile__form'>
                    <div className='profile__form__container'>
                        <h2 className='profile__greeting'>{`${props.greeting}, ${currentUser.name}!`}</h2>
                        <div className='profile__form-input__container'>
                            <label className='profile__form-label'>Имя</label>
                            <input className='profile__form-input profile__form_user_name' name='name' id='input-name' type='text' placeholder='Ваше имя' defaultValue={currentUser.name} required />
                        </div>
                        <div className='profile__form-input__container'>
                            <label className='profile__form-label'>E-mail</label>
                            <input className='profile__form-input profile__form_user_email' name='email' id='input-email' type='email' placeholder='Ваша почта' defaultValue={currentUser.email} required />
                        </div>
                    </div>

                    <div className='profile__form-btn__container'>
                        <button type='submit' className='profile__btn profile__btn-form'>{props.btnEditText}</button>
                        <button onClick={outSite} type='button' className='profile__btn profile__btn-exit'>{props.btnExitText}</button>
                    </div>
                </form>

            </div>

        </section>
    )
}

export default Profile