import './index.css';

import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // импортируем BrowserRouter
import ReactDOM from 'react-dom/client';

import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
