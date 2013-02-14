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

//create the teams on startup
for (var i = 0; i < teamColors.length; i++) {
	var newTeam = new Team.Team(i, teamColors[i], teamColors[i]);
	teams[teams.length] = newTeam;
};

//log the teams on startup
console.log('the Teams:')
console.log(teams);
console.log(getAvailableTeams(3));



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
		socket.emit("succesfull", {message: "you have joined and other players have been notified.", nickname : newPlayer.nickname, team : teams[newPlayer.team]});
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
		console.log(newPlayer);
		return newPlayer;
	}	

function GenerateRandomTeam(){
	var availableTeams = getAvailableTeams(maxPlayersPerTeam),
		chosenTeam = Math.floor(Math.random()*availableTeams.length);
		console.log("the team id choosen:" + chosenTeam);
		console.log(availableTeams);
	return availableTeams[chosenTeam];

}

function generateID(){
	return players.length;
}

function getAvailableTeams(maxPlayersPerTeam){
	var availableTeams = [];
	var countteams = [];
	teams.forEach(function (team){
		countteams[team.id] = 0;
	});
	players.forEach(function (player){
		countteams[player.team.id] += 1;
	});
	//foreach like loop, to get the key and value, not only the value like above.
	for(var team in countteams)
	{
		console.log('teamid');
		console.log(team);
		if(countteams[team] < maxPlayersPerTeam)
		{
			availableTeams[availableTeams.length] = team;
		}
	};
	return availableTeams;
}
