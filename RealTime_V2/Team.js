var Team = function Team(id, name, color)
{
	this.id = id;
	this.teamName = name;
	this.color = color;
}

Team.prototype.getID = function getID(){ return this.id; };
Team.prototype.getTeamName = function getName(){ return this.teamName; };
Team.prototype.getColor = function getColor(){ return this.color; };

exports.Team = Team;