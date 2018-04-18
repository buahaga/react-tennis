const io = require('socket.io')();
const port = 3001;

io.on('connection', socket => {
  socket.emit('connected', {id: socket.id});

  socket.on('ball', ballData => {
    socket.broadcast.emit('ball_server', ballData);
  })
  socket.on('score', scoreData => {
    console.log('score: ' + scoreData);
    socket.broadcast.emit('score_server', scoreData);
  })
  socket.on('paddle', paddleData => {
    console.log('paddle: ' + paddleData);
    socket.broadcast.emit('paddle_server', paddleData);
  })
  socket.on('enemy_paddle', enemyPaddleData => {
    socket.broadcast.emit('enemy_paddle_server', enemyPaddleData);
  })
})

io.listen(port);
console.log('Server on port ', port);
