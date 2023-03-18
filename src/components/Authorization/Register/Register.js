import React from 'react'
import './Register.css';
import WithForm from '../../WithForm/WithForm';

function Register() {
    return (
        <section className='register'>
            <div className='register__container'>
                <WithForm
                    className='register'
                    title='Добро пожаловать!'
                    buttonText='Зарегестрироваться'
                    authText='Уже зарегистрированы?'
                    authLinkText='Войти'
                    authLink='/signin'
                >
                    <div className='register__inputs'>
                        <label className='register__label'>Имя</label>
                        <input className='register__input register__input_user_name' type='text' id='new-user-name' required />
                        <label className='register__label'>E-mail</label>
                        <input className='register__input register__input_user_email' type='email' id='new-user-email' required />
                        <label className='register__label'>Пароль</label>
                        <input className='register__input register__input_user_password' type='password' id='new-user-password' required />
                    </div>
                </WithForm>
            </div>
        </section>
    )
}

export default Register