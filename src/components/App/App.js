import './App.css';
import { React, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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

function App() {

  const location = useLocation();

  // Показываем или скрываем компонент
  const hideOnFooter = ['/profile'];
  const hideOnHeader = ['/signup', '/signin'];
  const hideFooter = hideOnFooter.includes(location.pathname);
  const hideHeader = hideOnHeader.includes(location.pathname);

  const [valueHideHeaderAndFooter, setValueHideHeaderAndFooter] = useState(false);
  const [preloader, setPreloader] = useState(false);
  const [dataMovies, setDataMovies] = useState([]);
  const [showBlockCards, setShowBlockCards] = useState(false);
  const [userSearchParams, setUserSearchParams] = useState();
  let requestUser = '';

  // Отправка запроса на фильм
  const getMoviesList = () => {
    setPreloader(true);
    setShowBlockCards(true);

    Promise.all([apiOther.getMoviesList()])
      .then((moviesList) => {
        moviesList.map((movies) => {
          let arrayMovies = [];

          movies.forEach((movie) => {
            if (movie.nameRU.toLowerCase().includes(requestUser) || movie.nameEN.toLowerCase().includes(requestUser)) {
              return arrayMovies.push(movie);
            } return;
          })

          setDataMovies(arrayMovies);
        })
      })
      .then(() => setTimeout(() => { setPreloader(false) }, 2000))
      .catch((err) => {
        setPreloader(true);
        setShowBlockCards(false);
        return console.log(err)
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
    console.log(checkbox)
    return getMoviesList();
  }

  return (
    <>
      {hideHeader || valueHideHeaderAndFooter ? <></> : <Header />}
      <main className='main-content'>
        <Routes>
          <Route
            path='/pagesavemovies'
            element={
              <PageSaveMovies
                preloader={preloader}
              />}
            usersSearchRequest={handleTypeUser}
          />
          <Route
            path='/pagemovies'
            element={
              <PageMovies
                moviesList={dataMovies
                  ? dataMovies
                  : []}
                preloader={preloader}
                showBlockCards={showBlockCards}
                handleShowPreloader={handleShowPreloader}
                usersSearchRequest={handleTypeUser}
              />}
          />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<Register />} />
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
          <Route path='/' element={<Main />} />
          <Route path='*' element={<PageNotFound hideHeaderAndFooter={hideHeaderAndFooter} />} />
        </Routes >
      </main>
      {hideFooter || hideHeader || valueHideHeaderAndFooter ? <></> : <Footer />}
    </>
  )
}

export default App;
