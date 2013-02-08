var Team = function Team(id, name, color)
{
	this.id = id;
	this.name = name;
	this.color = color;
}

Team.prototype.getID = function getID(){ return this.id; };
Team.prototype.getName = function getName(){ return this.name; };
Team.prototype.getColor = function getColor(){ return this.color; };

exports.Team = Team;