// let io;

// module.exports = {
//   init: httpServer => {
//     io = require('socket.io')(httpServer);
//     console.log('Socket Initialized')
//     return io;
//   },
//   getIo: () => {
//     if (!io) {
//       throw new Error('Socket.io not initialized!');
//     }
//     return io;
//   }
// };