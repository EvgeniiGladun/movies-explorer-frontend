import React from 'react';
import { Link } from 'react-router-dom';
import './WithForm.css';
import logo from '../../images/logo/logo.svg';

function WithForm(props) {
    return (
        <section
            className={`form form-${props.className}`}
        >
            <div className='form__container'>
                <div className='form__header'>
                    <Link to='/'><img className='form__logo' src={logo} alt="Логотип" /></Link>
                    <h2 className='form__greeting'>{props.title}</h2>
                </div>

                <form className='form__content'>
                    {props.children}
                    <button className='form__btn-sends' type='submit'>
                        {props.buttonText}
                    </button>
                </form>
                <h4 className='form__authorization'>{props.authText}<Link className='form__authorization-link' to={props.authLink}>{` ${props.authLinkText}`}</Link></h4>
            </div>
        </section>
    );
}

export default WithForm;
