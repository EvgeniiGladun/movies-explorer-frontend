import { userContex } from "../../../contexts/CurrentUserContext";

import { React, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import './Register.css';
import WithForm from '../../WithForm/WithForm';
import { useFormWithValidation } from '../../Validate/Validate';
import { pattern } from '../../../utils/constants';

function Register({ serverResWithError, handleRegister, ...props }) {
    const currentUser = useContext(userContex);
    const { values, handleChange, errors, isValid } = useFormWithValidation();

    // Обработка регистарицй пользователя
    function handleSubmit(evt) {
        evt.preventDefault();

        if (!values.password) {
            return;
        }
        const { name, email, password } = values;
        handleNewRegister(name, email, password);
    }

    const handleNewRegister = (name, email, password) => {
        handleRegister(name, email.toLowerCase(), password);
    };

    if (currentUser) {
        return <Navigate to="/" />
    } return (
        <section className='register'>
            <div className='register__container'>
                <WithForm
                    className='register'
                    title='Добро пожаловать!'
                    buttonText='Зарегистрироваться'
                    authText='Уже зарегистрированы?'
                    authLinkText='Войти'
                    authLink='/signin'
                >

                    <form
                        onSubmit={handleSubmit}
                        className="register__form"
                        action="formEntrance"
                        name="formEntrance"
                    >
                        <div className='register__inputs'>
                            <label className='register__label'>Имя</label>
                            <input className='register__input register__input_user_name' value={values.name || ''} onChange={handleChange} type='text' id='new-user-name' name='name' minLength={2} maxLength={30} required />
                            <span className={`register__span ${!errors ? "" : "register__span_type_input_error"}`}
                            >{errors.name}</span>

                            <label className='register__label'>E-mail</label>
                            <input className='register__input register__input_user_email' value={values.email || ''} onChange={handleChange} pattern={pattern} type='email' id='new-user-email' name='email' required />
                            <span className={`register__span ${!errors ? "" : "register__span_type_input_error"}`}
                            >{errors.email}</span>

                            <label className='register__label'>Пароль</label>
                            <input className='register__input register__input_user_password' value={values.password || ''} onChange={handleChange} type='password' id='new-user-password' name='password' required />
                            <span className={`register__span ${!errors ? "" : "register__span_type_input_error"}`}
                            >{errors.password}</span>
                        </div>

                        <span
                            className={
                                `register__span ${!serverResWithError
                                    ? ""
                                    : "register__span_type_register"}`
                            }
                        >
                            {serverResWithError.message}
                        </span>

                        <button
                            className={`register__form-btn-sends-register ${isValid ? "register__form-btn-sends-register_active" : ""}`}
                            disabled={!isValid}
                            type='submit'
                        >
                            Зарегистрироваться
                        </button>
                    </form>
                </WithForm>
            </div>
        </section>
    )
}

export default Register