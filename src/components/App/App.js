import { userContex } from '../../contexts/CurrentUserContext';

import './App.css';
import { React, useState, useEffect } from 'react';
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
  const requestUserHistory = localStorage.getItem('requestUser');
  const moviesUserHistory = localStorage.getItem('moviesUser');
  const switchUser = localStorage.getItem('switchStatus');
  const [requestUserSerch, setRequestUserSerch] = useState(switchUser ? switchUser : true);
  const [checkboxSwitch, setCheckboxSwitch] = useState(requestUserHistory ? requestUserHistory : '');
  const [moviesHistory, setMoviesHistory] = useState(moviesUserHistory ? moviesUserHistory : []);
  const [loggedIn, setLoggedIn] = useState(false);

  const [valueHideHeaderAndFooter, setValueHideHeaderAndFooter] = useState(false);
  const [preloader, setPreloader] = useState(false);
  const [dataMovies, setDataMovies] = useState([]);
  const [dataUserMovies, setDataUserMovies] = useState([]);
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({});
  const [showBlockCards, setShowBlockCards] = useState(false);
  const [showBlockErr, setShowBlockErr] = useState(false);
  const [getErrorMovies, setGetErrorMovies] = useState(false);
  let requestUser = '';

  // Проверка JWT ключа в файлах пользвоателя
  useEffect(() => {

    // Если есть токен, авторизируем
    apiMain
      .getAuthenticationUser()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
        }
      }).catch((err) => console.log(`Вы не авторизованы, ${err}`));
  }
    , [])

  useEffect(() => {

    if (!loggedIn) {
      return;
    }

    Promise.all([apiMain.getInitialUsers(), apiMain.getInitialMovies()])
      .then(([dataUser, moviesUserList]) => {
        // Делаю запрос данных - пользователя
        setCurrentUser(dataUser);
        console.log(moviesUserList)
        setDataUserMovies(moviesUserList.map((movies) => movies));
      })

      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, [loggedIn]);

  // Отправка запроса на фильм
  const getMoviesList = () => {
    setPreloader(true);
    setShowBlockErr(false);
    setShowBlockCards(true);
    console.log(switchUser)

    apiOther
      .getMoviesList()
      .then((moviesList) => {
        let arrayMovies = [];
        let arrayMoviesSmail = [];

        moviesList.forEach((movie) => {
          if (movie.nameRU.toLowerCase().includes(requestUser)
            || movie.nameEN.toLowerCase().includes(requestUser)) {
            if (switchUser && movie.duration < 40) {
              return arrayMoviesSmail.push(movie);
            }
            return arrayMovies.push(movie);
          };
        })
        if (arrayMovies.length <= 0) {
          setShowBlockCards(false);
          setGetErrorMovies(false);
          setShowBlockErr(true);
          setDataMovies([]);
          return;
        }

        localStorage.setItem('moviesUser', JSON.stringify(arrayMovies));
        localStorage.setItem('requestUser', requestUser);
        // Записываем массив из фильмов в стейт переменную
        setDataMovies(switchUser == "true" ? arrayMoviesSmail : arrayMovies);
      })
      .then(() => setPreloader(false))
      .catch((err) => {
        setPreloader(false);
        setGetErrorMovies(true);
        setShowBlockCards(false);
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
    setShowBlockErr(false);
    requestUser = request;
    localStorage.setItem('requestUser', requestUser);
    return getMoviesList();
  }

  const hendlerMoviesLike = (movies, isLiked) => {

    if (!isLiked) {
      // Отправляем запрос в API для удаления фильма
      apiMain
        .deleteMovies(dataUserMovies.find(i => i.movieId === movies.id)._id)
        .then((res) => {
          console.log(res)
          setDataUserMovies(dataUserMovies.filter((arrCards) => arrCards._id !== movies._id));
        })
        .then(() => {
          setDataUserMovies(dataUserMovies.filter((arrCards) => arrCards._id !== movies._id));
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    } else {
      // Отправляем запрос в API и получаем обновлённые данные фильма
      apiMain
        .setAddNewMovies(movies)
        .then((arrNewMovies) => {
          console.log(arrNewMovies)
          setDataUserMovies([arrNewMovies, ...dataUserMovies]);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  };

  function hendlerMoviesDelete(movies) {

    // Отправляем запрос в API для удаления фильма
    apiMain
      .deleteMovies(movies._id)
      .then(() => {
        setDataUserMovies(dataUserMovies.filter((arrCards) => arrCards._id !== movies._id));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  const handleAddPlaceSubmit = (dataAddMovie) => {

    // Отправляем в API новые данные фильма и добавляем в массив
    apiMain
      .setAddNewMovies(dataAddMovie)
      .then((arrAddCard) => {
        return setCards([arrAddCard, ...cards]);
      })
      .catch((err) => {
        return console.log(err); // выведем ошибку в консоль
      });
  };

  const handleNewUserData = (name, email) => {
    console.log(name, email)
    // Отправляем в API новые данные фильма и добавляем в массив
    apiMain
      .setInitialUsers(name, email)
      .then((newDataUser) => {
        return setCurrentUser({
          name: newDataUser.name,
          email: newDataUser.email,
        });
      })
      .catch((err) => {
        return console.log(err); // выведем ошибку в консоль
      });
  };

  const handleLogin = (email, password) => {
    apiMain
      .setAuthorizeUser(email.toLowerCase(), password)
      .then((data) => {
        if (true) {
          // console.log(document.cookie = data.JWT)
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
        return handleLogin(email, password);
      })
      .catch((err) => {
        setLoggedIn(false);
        return console.log(err);
      });
  }

  const handleLoggedIn = (boolew) => {
    apiMain
      .getLogout()
      .catch((err) => console.log(err));
    setLoggedIn(boolew);
    localStorage.clear();
  }

  return (
    <>
      <userContex.Provider value={currentUser}>
        {hideHeader || valueHideHeaderAndFooter ? <></> : <Header loggedIn={loggedIn} />}
        <main className='main-content'>
          <Routes>
            <Route element={
              <ProtectedRoute
                loggedIn={loggedIn} />}>
              <Route
                path='/pagesavemovies'
                element={
                  <PageSaveMovies
                    requestUserSerch={requestUserSerch}
                    dataUserMovies={dataUserMovies
                      ? dataUserMovies
                      : []}
                    card={card}
                    preloader={preloader}
                    getErrorMovies={getErrorMovies}
                    showBlockErr={showBlockErr}
                    showBlockCards={showBlockCards}
                    hendlerMoviesDelete={hendlerMoviesDelete}
                    usersSearchRequest={handleTypeUser}
                  />}
              />
              <Route
                path='/pagemovies'
                element={
                  <PageMovies
                    requestUserSerch={requestUserSerch}
                    hendlerMoviesLike={hendlerMoviesLike}
                    dataUserMovies={dataUserMovies
                      ? dataUserMovies
                      : []}
                    moviesList={dataMovies
                      ? dataMovies
                      : []}
                    card={card}
                    preloader={preloader}
                    showBlockCards={showBlockCards}
                    showBlockErr={showBlockErr}
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
                    btnEditText='Редактировать'
                    btnExitText='Выйти из аккаунта'
                    onLoggedIn={handleLoggedIn}
                    handleNewUserData={handleNewUserData}
                  />}
              />
            </Route>
            <Route path='/signin' element={<Login handleLogin={handleLogin} />} />
            <Route path='/signup' element={<Register handleRegister={handleRegister} />} />
            <Route path='*' element={<PageNotFound hideHeaderAndFooter={hideHeaderAndFooter} />} />
            <Route path='/' element={<Main />} />
          </Routes >
        </main>
        {hideFooter || hideHeader || valueHideHeaderAndFooter ? <></> : <Footer />}
      </userContex.Provider>
    </>
  )
}

export default App;
