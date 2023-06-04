import React from 'react'
import './Header.css';
import { NavLink, Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo/logo.svg'
import avatar from '../../images/profile/profile-icon.svg';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, ...props }) {

    // Получаем текущую ширину страницы
    const [width, setWidth] = React.useState(window.innerWidth);
    // Заданное значения для отработки рендора страницы
    const breakpoint = 768;

    const [isOpenBurger, setIsOpenBurger] = React.useState(false);
    const currentLocation = useLocation().pathname === '/';
    const [isOpenMainPage, setIsOpenMainPage] = React.useState(true);


    // Добавление / удаление вызова функций 
    React.useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResizeWindow);
        return () => {
            window.removeEventListener('resize', handleResizeWindow);
        };
    }, []);

    React.useEffect(() => {

        setIsOpenMainPage(currentLocation);
    }, [currentLocation]);

    return currentLocation ? loggedIn ? (
        <header className={`header ${currentLocation && isOpenMainPage ? 'header_color_grey' : ''}`}>
            <div className='header__container'>
                <div className='header__menu__container'>
                    <Link to='/'><img className='header__logo' src={logo} alt='Логотип' /></Link>
                    <nav className='header__menu-movies'>
                        <NavLink to='pagemovies' className='header__link header__link-movies'>Фильмы</NavLink>
                        <NavLink to='pagesavemovies' className='header__link'>Сохранённые фильмы</NavLink>
                    </nav>
                </div>

                <nav className='header__menu-profile'>
                    <NavLink to='profile' className='header__link header__link-profile'>Аккаунт</NavLink>
                    <div className='header__profile__container'>
                        <img className='header__profile__avatar' src={avatar} alt='Аватар профиля' />
                    </div>
                </nav>
            </div>
        </header>
    ) : (
        <header className={`header ${currentLocation && isOpenMainPage ? 'header_color_grey' : ''}`}>
            <div className='header__container'>

                <a className='header__logo-link' href='#about-project'><img className='header__logo' src={logo} alt='Логотип' /></a>

                <nav className='header__menu'>
                    <NavLink to='signup' className='header__link'>Регистрация</NavLink>
                    <NavLink to='signin' className='header__link header__link-login'>
                        <div className='header__link-btn header__link-btn_color_green'>Войти</div>
                    </NavLink>
                </nav>
            </div>
        </header>
    ) : width > breakpoint ? (
        <header className={`header`}>
            <div className='header__container'>

                <div className='header__menu__container'>
                    <Link to='/'><img className='header__logo' src={logo} alt='Логотип' /></Link>
                    <nav className='header__menu-movies'>
                        <NavLink to='pagemovies' className='header__link header__link-movies'>Фильмы</NavLink>
                        <NavLink to='pagesavemovies' className='header__link'>Сохранённые фильмы</NavLink>
                    </nav>
                </div>

                <nav className='header__menu-profile'>
                    <NavLink to='profile' className='header__link header__link-profile'>Аккаунт</NavLink>
                    <div className='header__profile__container'>
                        <img className='header__profile__avatar' src={avatar} alt='Аватар профиля' />
                    </div>
                </nav>

            </div>
        </header>
    ) : (
        <header className='header-mobile'>
            <div className='header-mobile__container'>
                <Link className='header-mobile__logo' to='/'><img className='header-mobile__logo' src={logo} alt='Логотип' /></Link>
                <div onClick={() => { setIsOpenBurger(isOpenBurger !== true) }} className='burger-menu'>
                    {
                        isOpenBurger ? <button className='burger-menu__btn-close'>+</button>
                            : <button className='burger-menu__btn'></button>
                    }
                </div>
                <Navigation isOpenBurger={isOpenBurger} currentWidth={width} />
            </div>
        </header>
    )
}

export default Header