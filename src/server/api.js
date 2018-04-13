// // function subscribeToTimer(interval, cb) {
// //
// // }
// // export { subscribeToTimer }
//
// import openSocket from 'socket.io-client';
// const  socket = openSocket('http://localhost:8000');
// function subscribeToTimer(cb) {
//   socket.on('timer', timestamp => cb(null, timestamp));
//   socket.emit('subscribeToTimer', 300000);
// }
// export { subscribeToTimer };
