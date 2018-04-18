import openSocket from 'socket.io-client';
import {confirmConnect} from '../actions/connect.action';
import {moveBall} from '../actions/ball.action';
import {moveEnemyPaddle} from '../actions/enemyPaddle.action';
import {movePaddle} from '../actions/paddle.action';
import {editScore} from '../actions/score.action';

let socket;

export const customMiddleWare = (store) => (next) => (action) => {
  let type = action.type;

  switch (type) {
    case 'CONNECT':
      socket = openSocket('http://localhost:3001');
      socket.on('connected', () => {
        store.dispatch(confirmConnect());
      });
      break;
    case 'MOVE_BALL':
      socket.emit('ball', {top: action.position.top, left: action.position.left});
      break;
    case 'MOVE_PADDLE':
      socket.emit('paddle', action.position);
      break;
    case 'MOVE_ENEMY_PADDLE':
      socket.emit('enemy_paddle', action.position);
      break;
    case 'EDIT_SCORE':
      socket.emit('score', action.value);
      break;
    default:
      next(action);
  }

  socket.on('ball_server', (ballData) => {
    store.dispatch(movePaddle(ballData.top, ballData.left));
  });
  socket.on('score_server', (scoreData) => {
    console.log(scoreData);
    store.dispatch(editScore(scoreData));
  });
  socket.on('paddle_server', (paddleData) => {
    console.log(paddleData);
    store.dispatch(movePaddle(paddleData));
  });
  socket.on('enemy_paddle_server', (enemyPaddleData) => {
    console.log(enemyPaddleData);
    store.dispatch(movePaddle(enemyPaddleData));
  });

  next(action);
}

// socket.on('score_server', message => {
//   this.props.editScore(message);
//   console.log(message);
// });
// socket.on('ball_server', message => {
//   this.props.moveBall(message);
// });
// socket.on('paddle_server', message => {
//   this.props.movePaddle(message);
// });
