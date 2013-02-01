var app = require('express')()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server);

var player = require('./Player'),
	players = [];

chatClients = new Object();

server.listen(2525);

io.set('log level', 3);

io.sockets.on('connection', function(socket) {
	socket.on('updateServer', function(data){
		console.log(data);
	});
	socket.on('qq', function(data){
		console.log(data);
	});
	socket.on('onmessage', function(data){
		console.log(data);
	});
	socket.on('messages', function(data){
		console.log(data);
	});
	socket.on('anything', function(data){
		console.log(data);
	});
	socket.on('username_input', function(data) {
		connect(socket, data);
	});

	socket.broadcast.emit('User connected', { Message: "User is connected" });

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