import { combineReducers } from 'redux';
import ball from './ball';
import paddle from './paddle';
import enemyPaddle from './enemyPaddle';
import score from './score';
import connect from './connect';

const theGame = combineReducers({
  paddle,
  enemyPaddle,
  ball,
  score,
  connect,
});

export default theGame;
