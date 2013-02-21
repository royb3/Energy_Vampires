/*
listTeamplayers(team)
getTeamScores() 
getScore(playerId) score == hp
getPlayersEvent(Id)

newPlayer(gameId) 
addEvent()

Player - _id, _idGame, _idName, hitpoints, team, typedevice_type
Game - _id, name, type, amount_teams
History - _id, Player_id, Game_id, timestamp, long, lat, alt, orientation, click, hitpoints_change, speed
*/
var databaseUrl = "test"; // "username:password@example.com/mydb"
var collections = ["users", "players", "Game", "History"]
var db = require("mongojs").connect(databaseUrl, collections);

var sys = require("sys"),  
	my_http = require("http"),
	path = require("path"),  
	url = require("url");  
	my_http.createServer(function(request,response){  
		sys.puts("Incoming connection");  
		response.writeHeader(200, {"Content-Type": "text/plain"});
		
		if(require("url").parse("/getScore")){
			getScore(1, function(scoreResult) { 
				console.log("the result is " + scoreResult);		
			});
		} else if(require("url").parse("/addEvent")){
			addEvent(1, 2, 100, 100, "N", function(addEventResult) { 
				//console.log(addEventResult);	
			});
		} else if(require("url").parse("/addGame")){			
			addEvent("gamenametest","tdm",10, function(addGameResult) { 
				console.log(addGameResult);
			});
		} else{
			console.log("Niets opgegeven.");  
		}
		response.end();  
	}).listen(8888);
sys.puts("Server Running on 8888");


//-----------------------------------------------------------------------------------------------------------------------------------
//get hp/score of one player
function getScore(playerid, callback){ 
	console.log('Functie player score werkt oid?!');
	
	db.players.find({pid:playerid}, {_id: 0, _idGame:1, _idName:1, hitpoints: 1}, function(err, players){
		//console.log('players:');
		//console.log(players);
  		if(players == undefined){ 
			console.log("No players found");
		}
  		/*else players.forEach( function(player) {
    		//console.log(player.hitpoints);
			console.log(player.hitpoints);
			 return player.hitpoints;
  		});	
		*/
		else
		{
			for(var player in players)
			{
				//console.log(players[player].hitpoints);
				callback( players[player].hitpoints);
				//callback("hola");
			}
		}
	});
}

console.log("-------->>");

//getScore(1, function(scoreResult) { 
	//console.log("the result is " + scoreResult);		
//});

console.log("<<-------");

//-----------------------------------------------------------------------------------------------------------------------------------

//add event
function addEvent(play_id, game_id, lat, long, orient, callback){//WORKING
	var current_hp = getScore(2); 
	var old_lat =0; 
	var old_long =0;
	var speed =0;
	var l =0;
	db.History.find({Player_id:play_id}, function(err, History){
		if( err || !History) console.log("no history found");
		else History.forEach( function(history) {
    		old_lat = history.lat;
			old_long = history.long;
			l = history._id;	
		});
		calcuateSpeed(old_lat, old_long, lat, long, function(k){
				speed = k;
			});
		l++;	
		db.History.insert({_id:l, Player_id:play_id, Game_id:game_id, timestamp:"", long:long, lat:lat, orientation:orient, clicks:		        "", hitpoints_change:current_hp, speed:speed});
		//console.log("addEvent succesful");
		//callback("addEvent succesful.");
	});
	
}
function calcuateSpeed(old_lat, old_long, lat, long, callback){
	//http://www.movable-type.co.uk/scripts/latlong.html
	/*var dlon = long - old_long 
	var dlat = lat - old_lat 
	dlon = dlon / 2;
	var a = (sin(dlat/2))^2 + cos(lat1) * cos(lat2) * (sin(dlon))^2 
	var c = 2 * atan2( sqrt(a), sqrt(1-a) ) 
	var d = 6378.1 * c //(where R is the radius of the Earth)*/
	callback(10);
}
console.log("-------->>");

addEvent(1, 2, 100, 100, "N", function(addEventResult) { 
	//console.log(addEventResult);	
});

console.log("<<-------");	

//-----------------------------------------------------------------------------------------------------------------------------------

//addEvent(2, 1, 100, 100, "NW");

//add one game
function addGame(name, type, numberPlayers){//WORKING
	var i = "";
	db.Game.find(function(err, Game){
		Game.forEach( function(game) {
    		i = game._id;
		}) 	
		console.log(i);
		if(i != ""){
			i++
			db.Game.insert({_id:i, name:name, type:type, amount_teams:numberPlayers});
		} else { console.log("Error"); }
	})	
}

console.log("-------->>");

addEvent("gamenametest","tdm",10, function(addGameResult) { 
	console.log(addGameResult);
		
});
console.log("<<-------");	

//-----------------------------------------------------------------------------------------------------------------------------------

//add one player
function addPlayer(naam,callback){//WORKING
	var k = 1;
	db.players.find(function(err, players){
		if( err || !players) console.log("Error");
		else players.forEach( function(player) {
    		k = player._id;
		}) 	;
		k++;
		db.players.insert({_id:k, _idGame:0, idName:naam, hitpoints:0, team:"", typedevice_type:""});	
		callback("Player addededed");
		
	})
	
}
	console.log("-------->>");

addPlayer("agoidub552",function(addPlayerResult) { 
	console.log(addPlayerResult);
		
});
console.log("<<-------");

//-----------------------------------------------------------------------------------------------------------------------------------
function b(player, callback){
	var k = 0;
	if (player) console.log("error");
	else {
		if (player != null){
			player.forEach( function(player) {
				k = player._id;
				//console.log("rtrnHighest" + k);
			});
		}
		callback(k);
	}	
}

function a(player, callback){
	var z = b(player)
	b(player, function(bResult){
		z = bResult;
		});
	var text = "";
	var zz = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for(var i=0; i < 10; i++){	
		text = "";		
		z++;
		//console.log("hgstnummer" + z);
		for( var j=0; j < 5; j++ ){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		db.players.save({_id:z, _idGame:0, idName:"testing", hitpoints:0, team:"", typedevice_type:""});	
		//console.log(text);	
		callback("succes");	
	}	
}
//adds 10 random players
function addRandomPlayer(callback){//ISSUE doesn't add 10 players proper!
	
	//db.players.find(a());
	a(db.players.find(), function(xs){
		console.log(xs);
		});
}

console.log("-------->>");

addRandomPlayer(function(addRandomPlayerResult) { 
	console.log(addRadnomPlayerResult);
		
});
console.log("<<-------");

//-----------------------------------------------------------------------------------------------------------------------------------

//newGame();

function findHighestHid(history)
{
	var z = 0;
	if (!history) console.log("no history found");
	else history.forEach ( function (his){
		z = his.hid;
		//console.log("Read from database " + z);
		
	});	console.log("Highest Hid is " + z);
	return z
}

function fillHistoryWithValues( err, history){
	z = findHighestHid(history)
	for(h = 0; h <20; h++){
	
		var clicks = Math.floor(Math.random()*251)
		var speed = Math.floor(Math.random()*15)
		var long = Math.floor(Math.random()*181.00000)
		var lat = Math.floor(Math.random()*91.00000)
		var alt = Math.floor(Math.random()*21)
		keywords = ["N","NE","E","SE","S","SW","W","NW"]
		var orientation = keywords[Math.floor(Math.random()*keywords.length)]
		z++	
		console.log(z);
		db.history.save({hid: z, pid: 1, gid: 1, timestamp: '21:00', long: long, lat: lat, alt: alt, orentation: orientation, clicks: clicks, hitpoints_change: 'value', speed: speed});
	}
}

function history()
{
	
	var h = 0;
	var o = 1;
	
	db.history.find(fillHistoryWithValues);
}

addRandomPlayer(function(addRandomHistoryResult) { 
	console.log(addRadnomHistoryResult);
		
});
console.log("<<-------");
//history();
//-----------------------------------------------------------------------------------------------------------------------------------



function listTeamPlayers (team) {
	db.players.find({team:team}, function (err, players) {
			if ( err || !players) console.log ("Something went wrong listing the team players");
			else players.forEach( function(teamPlayers) {			
				console.log (teamPlayers);
				console.log("--------------------------------------------");	
			});
		
		});
	
}
//listTeamPlayers ("blue");
//-----------------------------------------------------------------------------------------------------------------------------------


function getTeamScore (team) {
	var teamScores = 0;
	
	//get data from database 
	db.players.find({team:team},{hitpoints: 1, _id: 0} ,function(err, players)
		{
			//once i have my data in a json format I calculate the total
			if (err || !players) { 
				console.log("yolo something went wrong when getting team score");
			} else { 
				players.forEach (function(player) {
					teamScores = teamScores + player.hitpoints;
					
				});
				console.log("Totall score of team " +team +" is " +teamScores);
			}
	});
}
//getTeamScore("red");
//-----------------------------------------------------------------------------------------------------------------------------------

function getPlayerEvent (playerId) {
	db.history.find({hid:playerId}, function (err , history)
	{
		if(err || !history){
			console.log("Something went wrong in loading events");
		} else {
			history.forEach (function(eventdata){
				console.log(eventdata);
			});
		}
	});
}
//getPlayerEvent("1");
//-----------------------------------------------------------------------------------------------------------------------------------