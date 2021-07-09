import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './apps/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/style.css'
import { Provider } from 'react-redux'
import store from '../src/store'
import setAuthToken from './utils/setAuthToken'

const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token)
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
