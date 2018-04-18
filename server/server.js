const io = require('socket.io')();
const port = 3001;
let clients = [];

io.on('connection', socket => {
  clients.push(socket.id);
  socket.emit('connected', clients.length);
  socket.on('disconnect', () => {
    clients.splice(clients.indexOf(socket.id), 1);
  })

  socket.on('ball', ballData => {
    socket.emit('ball_server', ballData);
    socket.broadcast.emit('ball_server', ballData);
  })
  socket.on('score', scoreData => {
    console.log('score: ' + scoreData);
    socket.emit('score_server', scoreData);
    socket.broadcast.emit('score_server', scoreData);
  })
  socket.on('paddle', paddleData => {
    console.log('paddle: ' + paddleData);
    socket.emit('paddle_server', paddleData);
    socket.broadcast.emit('paddle_server', paddleData);
  })
  socket.on('enemy_paddle', enemyPaddleData => {
    socket.emit('enemy_paddle_server', enemyPaddleData);
    socket.broadcast.emit('enemy_paddle_server', enemyPaddleData);
  })
})

io.listen(port);
console.log('Server on port ', port);
