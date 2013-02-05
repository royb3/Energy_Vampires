// Gamestate info

var gamestate = function(state){
	this.gamestates = {SERVER_START : 0
	, GAME_READY : 1
	, GAME_START : 2
	, GAME_RUNNING : 3
	, GAME_END : 4};

	this.state = state;

}
	
exports.gamestate = gamestate;

