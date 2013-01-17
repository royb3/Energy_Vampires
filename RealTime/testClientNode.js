var io = require("C:\\Users\\Roy\\node_modules\\node-socket.io-client\\socket.io").io,
	http = require("http"),
	readline = require("readline"),
	rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	}),
	address = "";

rl.question("What adress want you to connect to?", function(answer)
{
	adress = answer;
	console.log("Connecting to server : ( " + answer + " ).");
	

	var socketOptions = {
			host : 'http://localhost',
			port: 12345
		};
	
	var	socket = new io.Socket("http://localhost/", socketOptions);
	console.log(socket);
	socket.connect();
	console.log("na start verbinden:");
	console.log(socket);
	socket.on('connect', function(){
		console.log("You are succesfully connected");
	});
	socket.on('connect_failed', function(){
		console.log("you cannot connect to the server");
	});

	rl.close();
	
	

});

