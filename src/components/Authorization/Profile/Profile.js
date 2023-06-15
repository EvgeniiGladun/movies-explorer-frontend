import { userContex } from '../../../contexts/CurrentUserContext';

import { React, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { useFormWithValidation } from '../../Validate/Validate';

function Profile({ waitingResponse, serverResWithError, handleNewUserData, onLoggedIn, ...props }) {
    const currentUser = useContext(userContex);
    const { values, handleChange, errors, isValid } = useFormWithValidation({
        name: currentUser.name ? currentUser.name : '',
        email: currentUser.email ? currentUser.email : '',
    });
    const navigate = useNavigate();

    const isChanged = useMemo(() => {
        return currentUser.name !== values.name || currentUser.email !== values.email
    }, [currentUser, values.name, values.email])

    function handleSubmit(evt) {
        evt.preventDefault();
        handleNewUserData(values.name, values.email);
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
                        <div className='profile__form-list-inputs__container'>
                            <span className={`profile__span ${!errors ? "" : "profile__span_type_input_error"}`}
                            >{errors.name}</span>
                            <div className='profile__form-input__container'>
                                <label className='profile__form-label'>Имя</label>
                                <input className='profile__form-input profile__form_user_name' name='name' id='input-name' type='text' placeholder='Ваше имя' value={values.name} onChange={handleChange} minLength={2} maxLength={30} required />
                            </div>
                            <div className='profile__form-input__container'>
                                <label className='profile__form-label'>E-mail</label>
                                <input className='profile__form-input profile__form_user_email' name='email' id='input-email' type='email' placeholder='Ваша почта' value={values.email} onChange={handleChange} required />
                            </div>
                            <span className={`profile__span ${!errors ? "" : "profile__span_type_input_error"}`}
                            >{errors.email}</span>
                        </div>
                    </div>

                    <span
                        className={
                            `profile__span ${!serverResWithError || !waitingResponse.boolew
                                ? waitingResponse.message
                                    ? "profile__span-successful_type_profile"
                                    : ""
                                : "profile__span_type_profile"}`
                        }
                    >
                        {serverResWithError.message || waitingResponse.message}
                    </span>
                    <div className='profile__form-btn__container'>
                        <button type='submit' disabled={waitingResponse.boolew || !isChanged || !isValid} className={`profile__btn profile__btn-form ${waitingResponse.boolew || !isChanged || !isValid
                            ? 'profile__btn-form_disabled'
                            : ''}`}
                        >{props.btnEditText}</button>
                        <button onClick={outSite} type='button' className='profile__btn profile__btn-exit'>{props.btnExitText}</button>
                    </div>
                </form>

            </div>

        </section>
    )
}

export default Profile