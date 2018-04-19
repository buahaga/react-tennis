import { combineReducers } from 'redux';
import ball from './ball';
import paddle from './paddle';
import enemy from './enemy';
import score from './score';
import connect from './connect';
import ping from './ping';

const theGame = combineReducers({
  paddle,
  enemy,
  ball,
  score,
  connect,
  ping
});

export default theGame;
