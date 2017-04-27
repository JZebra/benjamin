import React from 'react';
import ReactDOM from 'react-dom';
import AppState from './AppState';
import ViewState from './ViewState';
import App from './App';
import AppTransportLayer from './AppTransportLayer';

const appStore = new AppState(new AppTransportLayer());
const viewStore = new ViewState();

ReactDOM.render(
  <App appStore={ appStore } viewStore={ viewStore } />,
  document.getElementById('root')
);
