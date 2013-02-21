var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

var Player = require('./Player.js'),
	players = [],
	Gamestate = require('./gamestate.js'),
	Team = require('./Team.js'),
	teams = [];

//parameters
var maxPlayers = 12,
	maxPlayersPerTeam = 3,
	teamColors = ['red', 'blue','green', 'yellow'],
	minPlayers = 8;

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
var countDown = {timeLeft:0, state:0};


io.set('log level', 3);

io.sockets.on('connection', function(socket) {
	socket.on('debug', function(data) {
		console.log(data);
	});

	socket.on('rockthebutton', function(data){

	});

	socket.on('send_broadcast', function(data){
		socket.broadcast.emit('send_broadcast', data);
	});

	socket.on('startGame', function(data){
		socket.broadcast.emit('startGame', data);
	});
	
	
	
	if(gamestate.state == gamestate.gamestates.SERVER_START){
		var newPlayer = PlayerJoinGame(socket);

		socket.broadcast.emit("playerJoined", { message : "player joined game", nickname : newPlayer.getNickname()});
		socket.emit("succesfull", {message: "you have joined and other players have been notified.", nickname : newPlayer.nickname, team : teams[newPlayer.team], playerList : players});

		
		//CountDown(5);
		

	}

	else if(gamestate.state == gamestate.gamestates.GAME_READY){
		socket.on('ready', function(data){
			var statechange = PlayerReady(data.clientId);
			if(statechange = 1)
			{
				gamestate.state = gamestate.gamestates.GAME_START;
				startGame();
			}
		});
	}
	else {
		socket.emit('waiting_message', { Message: 'Wait for the next game.' });
	}
});

function PlayerReady(playerid)
{
	players[playerid].state = 1;

	if(AreAllReady())
	{
		return 1;
	}
	return 0;
}

function AreAllReady()
{
	for(var player in players)
	{
		if (player.state == 0)
		{
			return false;
		}
	}
	return true;
}

function PlayerJoinGame (socket) {
	var id = generateID(),
		nickname = "player" + id,
		team = GenerateRandomTeam(),
		newPlayer = new Player.Player(id, nickname, 100, team, socket.id);
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

function startGame()
{

}

function CountDown(t)
{
	if(!countDown.state)
	{
		countDown.state = 1;
		countDown.timeLeft = t;
		countDown.interval = setInterval(function(){
			io.sockets.emit('countDown', {countDown: countDown.timeLeft, gamestate: gamestate.state});
			if(countDown.timeLeft < 1)
			{
				clearInterval(countDown.interval);
				gamestate.state = gamestate.gamestates.GAME_READY;
			}
			else
			{
				countDown.timeLeft = countDown.timeLeft - 1;
			}
		}, 1000);	
	}
}