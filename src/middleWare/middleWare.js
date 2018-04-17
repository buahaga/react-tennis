import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3005');


export const customMiddleWare = (store) => (next) => (action) => {
  let type = action.type;
  socket.on('connected', () => {
    switch (type) {
        case 'MOVE_BALL':
        socket.emit('ball', action.position.top);
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
        default: return;
      }
  });

  next(action);
}
