import openSocket from 'socket.io-client';
import {confirmConnect} from '../actions/confirmConnection.action';
import {moveBallServer} from '../actions/ball.action';
import {moveEnemyPaddleServer} from '../actions/enemyPaddle.action';
import {movePaddleServer} from '../actions/paddle.action';
import {editScoreServer} from '../actions/score.action';

let socket;

export const customMiddleWare = (store) => (next) => (action) => {
  let type = action.type;
  switch (type) {
    case 'PLAYER_CONNECT':
      if (!socket) {
        socket = openSocket('http://localhost:3001');
        socket.on('connected', (yourID) => {
          console.log('YourSocketID is: ' + yourID);
          store.dispatch(confirmConnect(yourID));
        });
        socket.on('ball_server', ({top, left}) => {
          store.dispatch(moveBallServer(top, left));
        });
        socket.on('paddle_server', (paddleData) => {
          store.dispatch(movePaddleServer(paddleData));
        });
        socket.on('enemy_paddle_server', (enemyPaddleData) => {
          store.dispatch(moveEnemyPaddleServer(enemyPaddleData));
        });
        socket.on('score_server', (scoreData) => {
          console.log(scoreData);
          store.dispatch(editScoreServer(scoreData));
        });
      }
      break;
    case 'MOVE_BALL':
      socket.emit('ball', {top: action.position.top, left: action.position.left});
      break;
    case 'MOVE_PADDLE':
      socket.emit('paddle', action.position);
      break;
    case 'MOVE_ENEMY_PADDLE':
      socket.emit('enemy_paddle', action.enemyPosition);
      break;
    case 'EDIT_SCORE':
      socket.emit('score', action.value);
      break;
    default:
      next(action);
  }

  next(action);
}
