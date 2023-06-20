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
