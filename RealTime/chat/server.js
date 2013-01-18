// Creating global parameters and start
// listening to 'port', we are creating an express
// server and then we bind it with the socket.io
var express   = require('express');
    app       = express();
    server    = require('http').createServer(app);
    io        = require('socket.io').listen(server);
    port      = 80,


    // Hash objects to save clients data
    // For example: clientid, username.

    chatClients = new Object();

// Listening to port
server.listen(port);

// Configure express, since this server is
// also a web server, we need to define the
// paths to the static files.)
app.use("/styles", express.static(__dirname + '/public/styles'));
app.use("/scripts", express.static(__dirname + '/public/scripts'));
app.use("/images", express.static(__dirname + '/public/images'));

// Serving the main application file (index.html)
// when a client makes a request to the app root
// (http://localhost:80/)
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

// Sets the log level of socket.io, with
// log level 2 we won't see all the heartbits
// of each socket, but only the handshakes and
// disconnects
io.set('log level', 2);

// Setting the transports by order, if some client
// is not supporting 'websockets' then the server will
// revert to 'xhr_polling' (like Comet/Long polling).
// For more configurations go to:
// https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.io
io.set('transports', [ 'websocket', 'xhr_polling' ]);

// Socket.io events, each connection goes through here
// and each event is emited in the client.
// I created a function to handle each event
io.sockets.on('connection', function(socket) {

  // After connection, the client sends us the
  // nickname through the connect event
  socket.on('connect', function(data){
    connect(socket, data);
  });

  // When a client sends a message, he emits
  // this event, then the server forwards the
  // message to other clients in the same room
  socket.on('chatmessage', function(data){
    chatmessage(socket, data);
  });

  // Client subscribe to a room
  socket.on('subscribe', function(data){
    subscribe(socket, data);
  });

  // Client unsubscribe from a room
  socket.on('ubsubscribe', function(data){
    unsubscribe(socket, data);
  });

  // When a client calls the 'socket.close()'
  // function or closes the browser, this event
  // is built in socket.io so we actually don't
  // need to fire it manually
  socket.on('disonnect', function(data){
    disconnect(socket);
  });
})

// Create a client for the socket
function connect(socket, data){
  // Generate clientId
  data.clientId = generateId();

  // Save the client to the hash object for
  // quick acces, we can save this data on
  // the socket with 'socket.set(key, value)'
  // but the only way to pull it back will be
  // async
  chatClients[socket.id] = data;

  // NOw the client object is ready, update
  // the client
  socket.emit('ready', { clientId: data.clientId });

  // Auto subscribe the client to the 'lobby'
  subscribe(socket, { room: 'lobby' });

  // Sends a list of all active rooms in the
  // server
  socket.emit('roomslist', { rooms: getRooms() });
}

// When a client disconnects, unsubscribe him from
// the rooms he is subscribed to
function disconnect(socket){
  // Get a lit of rooms for the client
  var rooms = io.sockets.manager.roomClients[socket.id];

  // Unsubscribe from the rooms
  for(var room in rooms){
    if(room && rooms[room]){
      ubsubscribe(socket, { room: room.replace('/', '') });
    }
  }

  // Client was unsubscribed from the rooms,
  // now we can delete him from the hash object
  delete chatClients[socket.id];
}

// Receive chat message from a client and
// send it to the relevant room
function chatmessage(socket, data){
  // By using 'socket.broadcast' we can send/emit
  // a message/event to all other clients except
  // the sender himself
  socket.broadcast.to(data.room).emit('chatmessage', { client:
    chatClients[socket.id], message: data.message, room: data.room });
}

// Subscribe a client to a room
function subscribe(socket, data){
  // Get a list of all active rooms
  var rooms = getRooms();

  // Check if this room exists, if not, update all
  // other clients about this new room
  if(rooms.indexOf('/' + data.room) < 0){
    socket.broadcast.emit('addroom', { room: data.room });
  }

  // Subscribe the client to the room
  socket.join(data.room);

  // Update all other clients about the online
  // presence
  updatePresence(data.room, socket, 'online');

  // Send to the client a list of all subscribed clients
  // in the room
  socket.emit('roomclients', { room: data.room, clients:
    getClientsInRoom(socket.id, data.room)})
}

// Unsubscribe a client from a room, this can be
// occured when a client disconnecs from the server
// or the subscribes to another room
function unsubscribe(socket, data){
  // Update all other clients about the offline
  // presence
  updatePresence(data.room, socket, 'offline');

  // Remove the client from socket.io room
  socket.leave(data.room);

  // If this client was the only on in that room
  // we are updating all the clients about that the
  // room is destroyed
  if(!countClientsInRoom(data.room)){
    // With 'io.sockets' we can contact all the
    // clients that are connected to the server
    io.sockets.emit('removeroom', { room: data.room });
  }
}

// 'io.sockets.manager.rooms' is an object that holds
// the active room names as a key, returning array of
// room names
function getRooms(){
  return Object.keys(io.sockets.manager.rooms);
}

// Get array of clients in a room
function getClientsInRoom(socketId, room){
  // Get array of socket id's in this room
  var socketId = io.sockets.manager.room['/' + room];
  var clients = [];

  if(socketIds && socketIds.length > 0){
    socketsCount = socketIds.length;

    // Push every client to the result array
    for(var i = 0, len = socketIds.length; i < len; i++){
      // Check if the socket is not the requesting
      // socket
      if(socketIds[i] != socketId){
        clients.push(chatClients[socketIds[i]]);
      }
    }
  }

  return clients;
}

// Get the amount of clients in a room
function countClientsInRoom(room){
  // 'io.sockets.manager.rooms' is an object that holds
  // the active room names as a key and an array of
  // all subscribed client socket id's
  if(io.sockets.manager.rooms['/' + room]){
    return io.sockets.manager.rooms['/' + room].length;
  }

  return 0;
}

// Updating all other clients when a client goes
// online or offline
function updatePresence(room, socket, state){
  // socket.io may add a trailing '/' to the
  // room name so we are clearing it
  room = room.replace('/', '');

  // By using 'socket.broadcast' we can send/emit
  // a message/event to all other clients except
  // the sender himself
  socket.broadast.to(room).emit('presence', { client:
    chatClients[socket.id], state: state, room: room });
}

// Unique id generator
function generateId(){
  var S4 = function () {
    return (((1 + Math.random()) * 0x100000) |
      0).toString(16).substring(1);
  };

  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" +
    S4() + "-" + S4() + S4() + S4());
}

// Show a message in console
console.log('Chat server is running and listening to port %d...', port);