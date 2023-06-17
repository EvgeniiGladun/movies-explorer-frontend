import { userContex } from '../../../contexts/CurrentUserContext';

import './Profile.css';
import { React, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormWithValidation } from '../../Validate/Validate';

function Profile({ serverResWithError, handleNewUserData, onLoggedIn, ...props }) {
    const navigate = useNavigate();
    const currentUser = useContext(userContex);
    const [waitingResponse, setWaitingResponse] = useState({
        message: '',
        isDisabled: false,
    });
    const { values, handleChange, errors, isValid } = useFormWithValidation({
        name: currentUser.name,
        email: currentUser.email,
    });

    const isChanged = useMemo(() => {
        return currentUser.name !== values.name || currentUser.email !== values.email
    }, [currentUser, values.name, values.email])

    async function handleSubmit(evt) {
        evt.preventDefault();

        try {
            setWaitingResponse({
                isDisabled: true,
            });
            await handleNewUserData(values.name, values.email);
            setWaitingResponse({
                message: 'Данные успешно сохраненны',
                isDisabled: true,
            });
        } finally {
            setTimeout(() => {
                setWaitingResponse({
                    message: '',
                    isDisabled: false,
                });
            }, 3500);
        }
    }

    // После выхода отрабатывается функция
    const outSite = () => {
        localStorage.clear();
        onLoggedIn(false);
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
                            `profile__span ${!serverResWithError || waitingResponse.isDisabled
                                ? waitingResponse.message
                                    ? "profile__span-successful_type_profile"
                                    : ""
                                : "profile__span_type_profile"}`
                        }
                    >
                        {serverResWithError.message || waitingResponse.message}
                    </span>
                    <div className='profile__form-btn__container'>
                        <button type='submit' disabled={waitingResponse.isDisabled || !isChanged || !isValid} className={`profile__btn profile__btn-form ${waitingResponse.isDisabled || !isChanged || !isValid
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