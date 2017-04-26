import React from 'react';
import ReactDOM from 'react-dom';
import AppState from './AppState';
import ViewState from './ViewState';
import App from './App';
import './index.css';

const store = new AppState();
const viewStore = new ViewState();

ReactDOM.render(
  <App store={store} viewStore={ viewStore } />,
  document.getElementById('root')
);
