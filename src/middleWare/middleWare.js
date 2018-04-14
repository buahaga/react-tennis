import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3005');

export const customMiddleWare = (store) => (next) => (action) => {
  let type = action.type;
  socket.on('connected', () => {
    type = false;
  });

  switch (type) {
      case 'MOVE_BALL':
      socket.emit('action', action.position.top);
      break;
      default: return;
    }


  next(action);
}
