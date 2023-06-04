import React from 'react'
import './Register.css';
import WithForm from '../../WithForm/WithForm';

function Register({ handleRegister, ...props }) {
    const [userDataIn, setUserDataIn] = React.useState({
        name: "",
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

    // Обработка регистарицй пользователя
    function handleSubmit(evt) {
        evt.preventDefault();

        if (!userDataIn.password) {
            return;
        }
        const { name, email, password } = userDataIn;
        handleNewRegister(name, email, password);
        setUserDataIn({
            name: "",
            email: "",
            password: "",
        });

    }

    const handleNewRegister = (name, email, password) => {
        handleRegister(name, email, password);
    };

    return (
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
                            <input className='register__input register__input_user_name' onChange={handleChange} type='text' id='new-user-name' name='name' value={userDataIn.name} required />
                            <label className='register__label'>E-mail</label>
                            <input className='register__input register__input_user_email' onChange={handleChange} type='email' id='new-user-email' name='email' value={userDataIn.email} required />
                            <label className='register__label'>Пароль</label>
                            <input className='register__input register__input_user_password' onChange={handleChange} type='password' id='new-user-password' name='password' value={userDataIn.password} required />
                        </div>

                        <button
                            className={`register__form-btn-sends-register`}
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