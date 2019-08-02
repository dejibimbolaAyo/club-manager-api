const io = require('socket.io')();

const port = process.env.SOCKET_PORT || 9000;
io.listen(port);

console.log("Socket connection created on port", port)

io.on('connection', (socket) => {
  socket.on('fetchMembers', () => {
    // console.log('client is subscribing to timer with interval ', data);
    socket.emit('newUser', "This is it...this is who we are, this is out reality");
    console.log("")
  });
});

export default io;