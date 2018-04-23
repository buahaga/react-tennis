import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import theGame from './reducers/reducers';
import {serverMiddleWare} from './middleWare/serverMiddleWare';
import {setPath} from './actions/connect.action.js';
import App from './containers/App.jsx';
import Login from './containers/Login.jsx';

const store = createStore(theGame, applyMiddleware(serverMiddleWare));
function isLogin() {
  store.dispatch(setPath(window.location.pathname));
  return !!sessionStorage.getItem('loginOk');
}

ReactDOM.render(<Provider store={store}>
  <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route render={() => (isLogin() ? <App/> : <Redirect to="/login"/>)}/>
      </Switch>
  </Router>
</Provider>, document.getElementById('root'));
