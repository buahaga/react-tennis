const io = require('socket.io')();

let score;

io.on('connection', socket => {
  socket.emit('connected', {id: socket.id});

  socket.on('ball', incommingData => {
    console.log('ball: ' + incommingData);
    //socket.broadcast.emit('ball_server', incommingData);
  })
  socket.on('paddle', incommingData => {
    console.log('paddle: ' + incommingData);
    //socket.broadcast.emit('paddle_server', incommingData);
  })
  socket.on('score', incommingData => {
    console.log('score: ' + incommingData);
    socket.emit('score_server', incommingData);
  })
})

const port = 3005;
io.listen(port);
console.log('Server on port ', port);
