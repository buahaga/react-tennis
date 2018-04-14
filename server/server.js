const io = require('socket.io')();

io.on('connection', socket => {
  socket.emit('connected', {id: socket.id});

  console.log('connected');

  socket.on('action', incommingData => {
    console.log(incommingData);
    //socket.broadcast.emit('padLeft', incommingData);
  })
})

const port = 3005;
io.listen(port);
console.log('Server on port ', port);
