import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import PageMovies from '../../pages/PageMovies/PageMovies';
import PageSaveMovies from '../../pages/PageSaveMovies/PageSaveMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Authorization/Register/Register';
import Login from '../Authorization/Login/Login';
import Profile from '../Authorization/Profile/Profile';
import Footer from '../Footer/Footer';

function App() {

  const location = useLocation();

  // Показываем или скрываем компонент
  const hideOnFooter = ['/profile'];
  const hideOnHeader = ['/signup', '/signin'];
  const hideFooter = hideOnFooter.includes(location.pathname);
  const hideHeader = hideOnHeader.includes(location.pathname);

  const [valueHideHeaderAndFooter, setValueHideHeaderAndFooter] = useState(false);

  function hideHeaderAndFooter(value) {
    return setValueHideHeaderAndFooter(value);
  }

  return (
    <>
      {hideHeader || valueHideHeaderAndFooter ? <></> : <Header />}
      <main className='main-content'>
        <Routes>
          <Route path='/pagesavemovies' element={<PageSaveMovies />} />
          <Route path='/pagemovies' element={<PageMovies />} />
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
