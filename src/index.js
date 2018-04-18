import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import theGame from './reducers/reducers';
import { serverMiddleWare } from './middleWare/serverMiddleWare';
import App from './App.jsx';

let store = createStore(
  theGame, {},
  applyMiddleware(serverMiddleWare)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
