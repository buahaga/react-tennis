import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import theGame from './reducers/reducers';
import {serverMiddleWare} from './middleWare/serverMiddleWare';
import {setPath} from './actions/connect.action.js';
import App from './App.jsx';
import Login from './components/Login.jsx';
import Logger from './components/Logger.jsx';

const store = createStore(theGame, applyMiddleware(serverMiddleWare));

function isLogin() {
  store.dispatch(setPath(window.location.pathname)); // Logger shows previous location right - test it later
  return !!sessionStorage.getItem('loginOk');
}

ReactDOM.render(<Provider store={store}>
  <Router>
    <LastLocationProvider>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route render={() => (isLogin() ? <App/> : <Redirect to="/login"/>)}/>
      </Switch>
      <Logger />
   </LastLocationProvider>
  </Router>
</Provider>, document.getElementById('root'));
