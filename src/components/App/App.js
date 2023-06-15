import { userContex } from "../../contexts/CurrentUserContext";

import "./App.css";
import { React, useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import PageMovies from "../../pages/PageMovies/PageMovies";
import PageSaveMovies from "../../pages/PageSaveMovies/PageSaveMovies";
import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../Authorization/Register/Register";
import Login from "../Authorization/Login/Login";
import Profile from "../Authorization/Profile/Profile";
import Footer from "../Footer/Footer";
import apiMain from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Показываем или скрываем компонент
  const hideFooter = ["/profile"].includes(location.pathname);
  const hideHeader = ["/signup", "/signin"].includes(location.pathname);

  const [currentUser, setCurrentUser] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isInited, setIsInited] = useState(false);

  const [valueHideHeaderAndFooter, setValueHideHeaderAndFooter] =
    useState(false);
  const [preloader, setPreloader] = useState(false);
  const [serverResWithError, setServerResWithError] = useState({});
  const [waitingResponse, setWaitingResponse] = useState({
    message: '',
    boolew: false,
  });

  const [dataUserMovies, setDataUserMovies] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Проверка JWT ключа в файлах пользвоателя
    apiMain
      .getAuthenticationUser()
      .then((res) => {
        if (res) {
          setCurrentUser(res);
          setLoggedIn(true);
        } setIsInited(true);
      })
      .catch((err) => console.log(`Вы не авторизованы, ${err}`));

    // Если есть токен, авторизируем
    if (!loggedIn) {
      return;
    }

    Promise.all([apiMain.getInitialUsers(), apiMain.getInitialMovies()])
      .then(([dataUser, moviesUserList]) => {
        // Делаю запрос данных - пользователя
        setCurrentUser(dataUser);
        setDataUserMovies(moviesUserList);
      })

      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, [loggedIn]);

  function hideHeaderAndFooter(value) {
    return setValueHideHeaderAndFooter(value);
  }

  const handleShowPreloader = (state) => {
    setPreloader(state);
  };

  const hendlerMoviesLike = (movies, isLiked) => {
    if (!isLiked) {
      // Отправляем запрос в API для удаления фильма
      apiMain
        .deleteMovies(dataUserMovies.find((i) => i.movieId === movies.id)._id)
        .then(() => {
          setDataUserMovies((prev) =>
            prev.filter((arrCards) => arrCards.movieId !== movies.id)
          );
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    } else {
      // Отправляем запрос в API и получаем обновлённые данные фильма
      apiMain
        .setAddNewMovies(movies)
        .then((arrNewMovies) => {
          setDataUserMovies((prev) => [...prev, arrNewMovies]);
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
        setDataUserMovies(
          dataUserMovies.filter((arrCards) => arrCards._id !== movies._id)
        );
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
    setWaitingResponse({
      boolew: true,
    });
    // Отправляем в API новые данные пользователя
    apiMain
      .setInitialUsers(name, email)
      .then((newDataUser) => {
        setCurrentUser({
          name: newDataUser.name,
          email: newDataUser.email,
        });
        setWaitingResponse({
          message: 'Данные успешно сохраненны',
        })
      }).then(() => {
        setTimeout(() => {
          setWaitingResponse({
            message: '',
            boolew: false,
          })
        }, 3500);
      }
      )
      .catch((err) => {
        if (err === 409) {
          setServerResWithError({
            message: "Пользователь с таким email уже существует.",
          });
        } else {
          setServerResWithError({
            message: "500 На сервере произошла ошибка.",
          });
        }
        setTimeout(() => setServerResWithError({}), 3500);
      });
  };

  // Логин пользователя
  const handleLogin = (email, password) => {
    apiMain
      .setAuthorizeUser(email, password)
      .then((data) => {
        if (true) {
          setLoggedIn(true);
          navigate("/pagemovies");
          return data;
        }
      })
      .catch((err) => {
        if (err === 400) {
          setServerResWithError({
            message: "При авторизации произошла ошибка.",
          });
        } else if (err === 401) {
          setServerResWithError({
            message: "Вы ввели неправильный логин или пароль.",
          })
        } else {
          setServerResWithError({
            message: "500 На сервере произошла ошибка.",
          });
        }
        setTimeout(() => setServerResWithError({}), 3500);
        setLoggedIn(false);
      });
  };

  function handleRegister(name, email, password) {
    apiMain
      .setRegisterUser(name, email, password)
      .then(() => {
        return handleLogin(email, password);
      })
      .catch((err) => {
        if (err === 400) {
          setServerResWithError({
            message: "При регистрации пользователя произошла ошибка.",
          })
        } else if (err === 409) {
          setServerResWithError({
            message: "Пользователь с таким email уже существует.",
          });
        } else {
          setServerResWithError({
            message: "500 На сервере произошла ошибка.",
          });
        }
        setTimeout(() => setServerResWithError({}), 3500);
        setLoggedIn(false);
      });
  }

  const handleLoggedIn = (boolew) => {
    apiMain.getLogout().catch((err) => console.log(err));
    setLoggedIn(boolew);
    localStorage.clear();
  };

  if (!isInited) {
    return null;
  }
  return (
    <>
      <userContex.Provider value={currentUser}>
        {hideHeader || valueHideHeaderAndFooter ? (
          <></>
        ) : (
          <Header loggedIn={loggedIn} />
        )}
        <main className="main-content">
          <Routes>
            <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
              <Route
                path="/pagesavemovies"
                element={
                  <PageSaveMovies
                    dataUserMovies={dataUserMovies}
                    preloader={preloader}
                    hendlerMoviesDelete={hendlerMoviesDelete}
                  />
                }
              />
              <Route
                path="/pagemovies"
                element={
                  <PageMovies
                    hendlerMoviesLike={hendlerMoviesLike}
                    dataUserMovies={dataUserMovies}
                    preloader={preloader}
                    handleShowPreloader={handleShowPreloader}
                    handleAddPlaceSubmit={handleAddPlaceSubmit}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    greeting="Привет"
                    btnEditText="Редактировать"
                    btnExitText="Выйти из аккаунта"
                    onLoggedIn={handleLoggedIn}
                    handleNewUserData={handleNewUserData}
                    waitingResponse={waitingResponse}
                    serverResWithError={serverResWithError}
                  />
                }
              />
            </Route>
            <Route
              path="/signin"
              element={<Login handleLogin={handleLogin} serverResWithError={serverResWithError} />}
            />
            <Route
              path="/signup"
              element={<Register handleRegister={handleRegister} serverResWithError={serverResWithError} />}
            />
            <Route
              path="*"
              element={
                <PageNotFound hideHeaderAndFooter={hideHeaderAndFooter} />
              }
            />
            <Route path="/" element={<Main />} />
          </Routes>
        </main>
        {hideFooter || hideHeader || valueHideHeaderAndFooter ? (
          <></>
        ) : (
          <Footer />
        )}
      </userContex.Provider>
    </>
  );
}

export default App;