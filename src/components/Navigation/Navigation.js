import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';
import avatar from '../../images/profile/profile-icon.svg';


function Navigation(props) {

    return (
        <div className={`navigation ${props.isOpenBurger ? 'navigation_active' : ''}`}>
            <div className={`navigation__container 
            ${props.currentWidth > 630
                    ? 'navigation__container_color_shadow'
                    : ''}`}>
                <nav className='navigation__menu'>
                    <div className='navigation__links'>
                        <nav className='navigation__menu-movies'>
                            <NavLink to='/' className={({ isActive }) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>Главная</NavLink>
                            <NavLink to='pagemovies' className={({ isActive }) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>Фильмы</NavLink>
                            <NavLink to='pagesavemovies' className={({ isActive }) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>Сохранённые фильмы</NavLink>
                        </nav>

                        <nav className='navigation__menu-profile'>
                            <NavLink to='profile' className={({ isActive }) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>Аккаунт</NavLink>
                            <div className='navigation__profile__container'>
                                <img className='navigation__profile__avatar' src={avatar} alt='Аватар профиля' />
                            </div>
                        </nav>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navigation