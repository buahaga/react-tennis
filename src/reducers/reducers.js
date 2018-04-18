import { combineReducers } from 'redux';
import ball from './ball';
import paddle from './paddle';
import enemy from './enemy';
import score from './score';
import connect from './connect';

const theGame = combineReducers({
  paddle,
  enemy,
  ball,
  score,
  connect,
});

export default theGame;
