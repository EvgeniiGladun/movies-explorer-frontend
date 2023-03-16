import React from 'react'
import './Login.css';
import WithForm from '../../WithForm/WithForm'

function Login() {
    return (
        <section className='authorization'>
            <div className="authorization__container">
                <WithForm
                    className='authorization'
                    title='Рады видеть!'
                    buttonText='Войти'
                    authText='Ещё не зарегистрированы?'
                    authLinkText='Регистрация'
                    authLink='/signup'
                >
                    <div className='authorization__inputs'>
                        <label className='authorization__label'>E-mail</label>
                        <input className='authorization__input authorization__input_user_email' type="email" id='user-email' required />
                        <label className='authorization__label'>Пароль</label>
                        <input className='authorization__input authorization__input_user_password' type="password" id='user-password' required />
                    </div>
                </WithForm>
            </div>
        </section>
    )
}

export default Login