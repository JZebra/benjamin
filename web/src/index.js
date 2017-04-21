import React from 'react';
import ReactDOM from 'react-dom';
import AppState from './AppState';
import App from './App';
import './index.css';

const store = new AppState();

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
);
