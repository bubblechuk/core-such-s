import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './slices/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

  <React.StrictMode>
    <App/>
  </React.StrictMode>
  </Provider>
);
reportWebVitals();
