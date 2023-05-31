import { userContex } from '../../contexts/CurrentUserContext';

import './App.css';
import { React, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import PageMovies from '../../pages/PageMovies/PageMovies';
import PageSaveMovies from '../../pages/PageSaveMovies/PageSaveMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Authorization/Register/Register';
import Login from '../Authorization/Login/Login';
import Profile from '../Authorization/Profile/Profile';
import Footer from '../Footer/Footer';
import apiOther from '../../utils/MoviesApi';
import apiMain from '../../utils/MainApi';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Показываем или скрываем компонент
  const hideOnFooter = ['/profile'];
  const hideOnHeader = ['/signup', '/signin'];
  const hideFooter = hideOnFooter.includes(location.pathname);
  const hideHeader = hideOnHeader.includes(location.pathname);

  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const [valueHideHeaderAndFooter, setValueHideHeaderAndFooter] = useState(false);
  const [preloader, setPreloader] = useState(false);
  const [dataMovies, setDataMovies] = useState([]);
  const [cards, setCards] = useState([]);
  const [showBlockCards, setShowBlockCards] = useState(false);
  const [getErrorMovies, setGetErrorMovies] = useState(false);
  let requestUser = '';

  // // Проверка JWT ключа в файлах пользвоателя
  // React.useEffect(() => {

  //   // Если есть токен, авторизируем
  //   apiMain
  //     .getAuthenticationUser()
  //     .then((res) => {
  //       if (res) {

  //         setLoggedIn(true);
  //         navigate('/pageMovies');
  //       }
  //     }).catch((err) => console.log(`Вы не авторизованы, ${err}`));
  // }
  //   , [])

  // Отправка запроса на фильм
  const getMoviesList = () => {
    setPreloader(true);
    setShowBlockCards(true);

    Promise.all([apiOther.getMoviesList(), apiMain.getInitialUsers()])
      .then(([moviesList, dataUser]) => {
        moviesList.map((movies) => {
          let arrayMovies = [];

          movies.forEach((movie) => {
            if (movie.nameRU.toLowerCase().includes(requestUser) || movie.nameEN.toLowerCase().includes(requestUser)) {
              return arrayMovies.push(movie);
            } return;
          })

          // Записываем массив из карточек в стейт
          setDataMovies(arrayMovies);
          // Делаю запрос данных - пользователя
          setCurrentUser(dataUser);
        })
      })
      .then(() => setTimeout(() => {
        setGetErrorMovies(false);
        setPreloader(false);
      }, 2000))
      .catch((err) => {
        setPreloader(false);
        setGetErrorMovies(true);
        setShowBlockCards(true);
        return console.log(err);
      });
  }

  function hideHeaderAndFooter(value) {
    return setValueHideHeaderAndFooter(value);
  }

  const handleShowPreloader = () => {
    return setPreloader(false);
  }

  // Смотрим что пользователь вводит
  const handleTypeUser = (request, checkbox, result) => {
    requestUser = request;
    localStorage.setItem('requestUser', requestUser);
    console.log(request)
    return getMoviesList();
  }

  const hendlerMoviesLike = () => {
    console.log('Movies like')
  };

  const handleAddPlaceSubmit = (dataAddMovie) => {

    // Отправляем в API новые данные фильма и добавляем в массив
    apiMain
      .setAddNewMovies(dataAddMovie)
      .then((arrAddCard) => {
        setCards([arrAddCard, ...cards]);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  };

  const handleLogin = (email, password) => {
    apiMain
      .setAuthorizeUser(email.toLowerCase(), password)
      .then((data) => {
        if (true) {
          setLoggedIn(true);
          navigate('/pagemovies');
          return data;
        }
      })
      .catch((err) => {
        return console.log(err);
      });
  }

  function handleRegister(name, email, password) {
    apiMain
      .setRegisterUser(name, email, password)
      .then(() => {
        console.log('нажал handleRegister API')
        return handleLogin(email, password);
      })
      .catch((err) => {
        setLoggedIn(false);
        return console.log(err);
      });
  }

  return (
    <>
      <userContex.Provider value={currentUser}>
        {hideHeader || valueHideHeaderAndFooter ? <></> : <Header />}
        <main className='main-content'>
          <Routes>
            <Route element={
              <ProtectedRoute
                loggedIn={loggedIn} />}>
              <Route
                path='/pagesavemovies'
                element={
                  <PageSaveMovies
                    moviesList={dataMovies
                      ? dataMovies
                      : []}
                    preloader={preloader}
                    getErrorMovies={getErrorMovies}
                    showBlockCards={showBlockCards}
                    usersSearchRequest={handleTypeUser}
                  />}
              />
              <Route
                path='/pagemovies'
                element={
                  <PageMovies
                    hendlerMoviesLike={hendlerMoviesLike}
                    moviesList={dataMovies
                      ? dataMovies
                      : []}
                    preloader={preloader}
                    showBlockCards={showBlockCards}
                    handleShowPreloader={handleShowPreloader}
                    usersSearchRequest={handleTypeUser}
                    getErrorMovies={getErrorMovies}
                    handleAddPlaceSubmit={handleAddPlaceSubmit}
                  />}
              />
              <Route
                path='/profile'
                element={
                  <Profile
                    greeting='Привет'
                    userName='Виталий'
                    userEmail='pochta@yandex.ru'
                    btnEditText='Редактировать'
                    btnExitText='Выйти из аккаунта'
                  />}
              />
            </Route>
            <Route path='/signin' element={<Login handleLogin={handleLogin} />} />
            <Route path='/signup' element={<Register handleRegister={handleRegister} />} />
            <Route path='/' element={<Main />} />
            <Route path='*' element={<PageNotFound hideHeaderAndFooter={hideHeaderAndFooter} />} />
          </Routes >
        </main>
        {hideFooter || hideHeader || valueHideHeaderAndFooter ? <></> : <Footer />}
      </userContex.Provider>
    </>
  )
}

export default App;
