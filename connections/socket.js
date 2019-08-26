const port = process.env.SOCKET_PORT || 9000;

const options = {
  allowUpgrades: true,
  transports: [
    'websocket', 'polling'
  ],
  pingTimeout: 9000,
  pingInterval: 3000,
  httpCompression: true,
  origins: '*:*'
};

const io = require('socket.io')(port, options);
console.log("Socket connection created on port", port)

// Initialize namespaces
let defaultNsp = io
let userNsp = io.of('/users')
let broadcastNsp = io.of('.broadcast')

// Open connections
userNsp.send('opened', "Connection opened")
broadcastNsp.send('opened', "Broadcast connection opened")

exports.emitEvent = (data, eventType, nameSpace) => {
  data = {
    eventType,
    data
  }

  let nsp = io.of(nameSpace || '/')

  nsp.on('connection', (client) => {
    client.on(eventType, (params) => {
      client.emit(eventType, data);
    })

  })
  console.log("Namespace listeners", nsp.getMaxListeners())
}

exports.broadcastUserEvent = (data, eventType, nameSpace) => {
  data = {
    eventType,
    data
  }
  userNsp.emit(eventType, data)
}
