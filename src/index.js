import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import theGame from './reducers/reducers';
import { serverMiddleWare } from './middleWare/serverMiddleWare';
import App from './App.jsx';

let store = createStore(
  theGame, {},
  applyMiddleware(serverMiddleWare)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
       <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
