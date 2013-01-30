var app = require('express')()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server);

var player = require('./Player');

chatClients = new Object();

server.listen(80);

io.set('log level', 3);

io.sockets.on('connection', function(socket) {
	socket.on('username_input', function(data) {
		connect(socket, data);
	});

	var gamestate = require('./gamestate');
	if(gamestate.state == gamestate.SERVER_START){
	}
	else{
		socket.emit('waiting_message', { Message: 'Wait for the next game.' });
	}
});

function connect(socket, data){
	data.ClientID = generateID();

	chatClients[socket.id] = data;

	console.log(data);
}

function generateID(){
  var S4 = function () {
    return (((1 + Math.random()) * 0x100000) |
      0).toString(16).substring(1);
  };

  return (S4() + S4());
}