import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './WithForm.css';
import logo from '../../images/logo/logo.svg';

function WithForm(props) {
    const location = useLocation();
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

    // Обработка регистарицй пользователя
    function handleSubmit(evt) {
        evt.preventDefault();

        if (!userDataIn.password) {
            return;
        }
        const { email, password } = userDataIn;
        handleLoginIn(email, password);
        setUserDataIn({
            email: "",
            password: "",
        });

    }

    const submitFormLogin = (evt) => {
        evt.preventDefault();
        alert('Форма отправлена')
    }

    const submitFormRegister = (evt) => {
        evt.preventDefault();
        alert('Форма отправлена регистрация')
    }

    return (
        <section
            className={`form form-${props.className}`}
        >
            <div className='form__container'>
                <div className='form__header'>
                    <Link className='form__logo-link' to='/'>
                        <img className='form__logo' src={logo} alt='Логотип' />
                    </Link>
                    <h2 className='form__greeting'>{props.title}</h2>
                </div>

                {props.children}
                <h4 className='form__authorization'>{props.authText}<Link className='form__authorization-link' to={props.authLink}>{` ${props.authLinkText}`}</Link></h4>
            </div>
        </section >
    );
}

export default WithForm;
