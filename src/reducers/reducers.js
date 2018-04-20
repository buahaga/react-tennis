import { combineReducers } from 'redux';
import ball from './ball.reducer';
import paddle from './paddle.reducer';
import enemy from './enemy.reducer';
import score from './score.reducer';
import connect from './connect.reducer';

const theGame = combineReducers({
  paddle,
  enemy,
  ball,
  score,
  connect
});

export default theGame;
