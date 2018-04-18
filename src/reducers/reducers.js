import { combineReducers } from 'redux';
import ball from './ball';
import paddle from './paddle';
import enemyPaddle from './enemyPaddle';
import score from './score';
import connect from './connect';
import wait from './wait';

const theGame = combineReducers({
  paddle,
  enemyPaddle,
  ball,
  score,
  connect,
  wait
});

export default theGame;
