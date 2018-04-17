import { combineReducers } from 'redux';
import ball from './ball';
import paddle from './paddle';
import enemyPaddle from './enemyPaddle';
import score from './score';

const theGame = combineReducers({
  paddle,
  enemyPaddle,
  ball,
  score
});

export default theGame;
