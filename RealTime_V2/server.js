var app = require('express')()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server);

chatClients = new Object();

server.listen(80);

io.set('log level', 2);

io.sockets.on('connection', function(socket) {
	socket.on('user_connected', function(data){
		connect(socket, data);
	});

	socket.on('test', function(data){
		console.log(data.data);
	});
});

function connect(socket, data){
	data.clientID = generateID();

	chatClients[socket.id] = data;

	console.log(data);
}

function generateID(){
  var S4 = function () {
    return (((1 + Math.random()) * 0x100000) |
      0).toString(16).substring(1);
  };

  return (S4());
}