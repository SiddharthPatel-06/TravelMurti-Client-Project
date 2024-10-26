import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import {store} from './redux/store'; 
import './index.css';
import { Toaster } from 'react-hot-toast';


ReactDOM.render(
  <Provider store={store}>
    <App />
    <Toaster /> 
  </Provider>,
  document.getElementById('root')
);
