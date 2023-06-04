import React from 'react'
import './Login.css';
import WithForm from '../../WithForm/WithForm'

function Login({ handleLogin, ...props }) {

    const [userDataIn, setUserDataIn] = React.useState({
        email: "",
        password: "",
    });

    // Обработка полей формы, забираем данные
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setUserDataIn({
            ...userDataIn,
            [name]: value,
        });
    };

    function handleLogins(email, password) {

        handleLogin(email, password);
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        const { email, password } = userDataIn;
        handleLogins(email, password);
    }

    return (
        <section className='authorization'>
            <div className='authorization__container'>
                <WithForm
                    className='authorization'
                    title='Рады видеть!'
                    buttonText='Войти'
                    authText='Ещё не зарегистрированы?'
                    authLinkText='Регистрация'
                    authLink='/signup'
                >

                    <form
                        onSubmit={handleSubmit}
                        className="authorization__form"
                        action="formEntrance"
                        name="formEntrance"
                    >
                        <div className='authorization__inputs'>
                            <label className='authorization__label'>E-mail</label>
                            <input className='authorization__input authorization__input_user_email' onChange={handleChange} type='email' id='user-email' name='email' required />
                            <label className='authorization__label'>Пароль</label>
                            <input className='authorization__input authorization__input_user_password' onChange={handleChange} type='password' id='user-password' name='password' required />
                        </div>

                        <button
                            className={`authorization__form-btn-sends-authorization`}
                            type='submit'
                        >
                            Войти
                        </button>
                    </form>
                </WithForm>
            </div>
        </section>
    )
}

export default Login