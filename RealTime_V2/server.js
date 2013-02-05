var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

var Player = require('./Player.js'),
	players = [],
	Gamestate = require('./gamestate.js');




server.listen(2525);

var gamestate = new Gamestate.Gamestate(0);

io.set('log level', 2);

io.sockets.on('connection', function(socket) {

	socket.on('send_broadcast', function(data) {
		socket.broadcast.emit('send_broadcast', { message : data.message });
	});

	socket.addListener('Test', function(data){
		console.log(data);
	});

	socket.on('message', function(data){
		console.log(data);
	});

	

	if(gamestate.state == gamestate.gamestates.SERVER_START){

	}
	else {
		socket.emit('waiting_message', { Message: 'Wait for the next game.' });
	}
});

function PlayerJoinGame (socket) {
		var id = generateID(),
		nickname = "player" + id;
		newPlayer = new Player.Player(id, nickname, 100, );
	}	

function GenerateRandomTeam(){
	var 
	return Math.floor((Math.random()*)
}

function generateID(){
	return players.length;
}
