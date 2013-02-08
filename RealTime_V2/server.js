var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

var Player = require('./Player.js'),
	players = [],
	Gamestate = require('./gamestate.js'),
	Team = require('./Team.js'),
	teams = [];

//paramaters
var maxPlayers = 12,
	maxPlayersPerTeam = 3,
	teamColors = ['red', 'blue','green', 'yellow'];

//create the teams;
for (var i = 0; i < teamColors.length; i++) {
	var newTeam = new Team.Team(i, teamColors[i], teamColors[i]);
	teams[teams.length] = newTeam;
};
console.log('the Teams:')
console.log(teams);




server.listen(2525);

var gamestate = new Gamestate.Gamestate(0);

io.set('log level', 3);

io.sockets.on('connection', function(socket) {

	socket.on('send_broadcast', function(data) {
		socket.broadcast.emit('send_broadcast', data);
		console.log(data);
	});

	socket.on('Test', function(data){
		console.log(data);
	});

	socket.on('message', function(data){
		console.log(data);
	});

	

	if(gamestate.state == gamestate.gamestates.SERVER_START){
		var newPlayer = PlayerJoinGame(socket),
			data = { message : "player joined game", nickname : newPlayer.nickname};
		console.log(data);

		socket.broadcast.emit("playerJoined", data);
		socket.emit("succesfull", {message: "you have joined and other players have been notified.", nickname : newPlayer.nickname});
	}
	else {
		socket.emit('waiting_message', { Message: 'Wait for the next game.' });
	}
});

function PlayerJoinGame (socket) {
		var id = generateID(),
		nickname = "player" + id,
		team = GenerateRandomTeam(),
		newPlayer = new Player.Player(id, nickname, 100, team, socket);
		players[id] = newPlayer;
		return newPlayer;
	}	

function GenerateRandomTeam(){
	var availableTeams = getAvaibleTeams(maxPlayersPerTeam),
		chosenTeam = Math.floor(Math.random()*availableTeams.length);
		console.log("the team id choosen:" + chosenTeam);
	return availableTeams[chosenTeam];

}

function generateID(){
	return players.length;
}

function getAvaibleTeams(maxPlayersPerTeam){
	var availableTeams = [];
	var countteams = [];
	players.forEach(function (player){
		countteams[player.team.id] += 1;
	});

	teams.forEach(function(team)
	{
		console.log('teamid');
		console.log(team);
		if(team < maxPlayersPerTeam)
		{
			availableTeams[availableTeams.length] = team;
		}
	});
	return availableTeams;
}
