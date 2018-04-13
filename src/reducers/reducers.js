import { combineReducers } from 'redux';
import ball from './ball';
import paddle from './paddle';
import score from './score';

const theGame = combineReducers({
  paddle,
  ball,
  score
});

export default theGame;
