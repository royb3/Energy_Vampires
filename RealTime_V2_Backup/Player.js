

function Player (id, nickname, score, team, socket, lng, lat) { 
	this.playerId = id;
	this.nickname = nickname,
	this.lng = lng,
	this.lat = lat,
	this.score = score,
	this.team = team;
	this.socket = socket;
}


Player.prototype.addScore 			= function addScore(value){ this.score += value; };
Player.prototype.drainScore 		= function drainScore(value){ this.score -= value; };
Player.prototype.switchTeam 		= function switchTeam(team){ this.team = team; };
Player.prototype.updateLocation 	= function updateLocation(location){ this.lng = location.lng; this.lat = location.lat;};
Player.prototype.getLocationPoint	= function getLocationPoint(){return "{" + this.lng + "," + this.lat + "}";};

//getters and setters

Player.prototype.getId 			= function getId(){ return this.playerId; };
Player.prototype.getNickname 	= function getNickname(){ return this.nickname;	 };
Player.prototype.setNickname 	= function setNickname(value){ this.nickname = value; };
Player.prototype.getLng 		= function getLng(){ return this.lng; };
Player.prototype.getLat 		= function getLat(){ return this.lat; };
Player.prototype.getScore 		= function getScore(){ return this.score; };
Player.prototype.getTeam 		= function getTeam(){ return this.team; };
Player.prototype.getUsername 	= function getUsername(){ return this.username; };
Player.prototype.getSocket 		= function getSocket(){ return this.socket; };







exports.Player = Player;