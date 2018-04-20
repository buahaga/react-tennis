import openSocket from 'socket.io-client';
import {connected} from '../actions/connect.action';
import {moveBallServer} from '../actions/ball.action';
import {moveEnemyPaddleServer} from '../actions/enemy.action';
import {movePaddleServer} from '../actions/paddle.action';
import {editScoreServer} from '../actions/score.action';

let socket;

export const serverMiddleWare = (store) => (next) => (action) => {
  let type = action.type;

  switch (type) {
    case 'CONNECTING':
      if (!socket) {
        socket = openSocket('http://localhost:3001/', { query: `room=${action.roomName}` });
        console.log('Join me the Room ' + action.roomName);
        socket.on('connected', (playerID) => {
          console.log('ThisPlayerID is: ' + playerID);
          store.dispatch(connected(playerID));
          socket.emit('room', 'newRoom');
        });

        socket.on('message', message => {
           console.log('Incoming message:', message);
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
