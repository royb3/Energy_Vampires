var http = require('http');
var io = require('socket.io');
var fs = require('fs');
var path = require('path');
var express = require('express');
//var form = require('connect-form');


var app = express();
var server = http.createServer(app);
server.listen(8080);



app.configure(function(){
    app.use("/", express.static(path.join(__dirname, 'public')));
	//form({ keepExtensions: true })

}); 
    

var websocket_server = io.listen(server, { log: false }); //.set('log level', 1); // reduce logging


function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}
var i = 0;
console.log("sfgagddsg");

websocket_server.sockets.on('connection', function (socket) {
  i++;
  socket.emit('news', { hello: i });
  //socket.emit('news', {sockets.clients(socket)}); 
  console.log("Join");
  //socket.emit('news', { hello: 'world21515' });
  //socket.on('my other event', function (data) {
  // console.log(data);
  //});
  //setInterval(function(){socket.emit('news', { hello: i }); i++;},1000);
    
    console.log(i);

  socket.on('returnNumber', function () {
    console.log("data:");
    socket.emit('number', {number: 500});
  });

  socket.on('disconnect', function () {
    //socket.emit('news', { hello: i });
    //socket.emit('news', { hello: 'world21515' });
    //socket.on('my other event', function (data) {
    // console.log(data);
    //});
    //setInterval(function(){socket.emit('news', { hello: i }); i++;},1000);
    i--;
    console.log("leave");
    console.log(i);

  });



socket.on('log', function(){
  console.log("sadgads");
  var Numbers = new Array();
  var min = 1000;
  var max = 10000;
  // and the formula is:
  var random = Math.floor(Math.random() * (max - min + 1)) + min;
  for (var i = 0; i < 3; i++) {
    Numbers[i] = random;
    random = Math.floor(Math.random() * (max - min + 1)) + min;
  };

  for (i = 0; i < Numbers.length; i ++)
  {
    console.log(Numbers[i]);
  }
  socket.emit('updateScores', {array: Numbers});

  var Positions =  new Array();
  min = 0;
  max = 100;
  for(i = 0; i < 3 ; i ++)
  {
    Positions[i] = new Object();
    Positions[i].x = Math.floor(Math.random() * (max - min + 1)) + min;
    Positions[i].y = Math.floor(Math.random() * (max - min + 1)) + min;
  }





  socket.emit('updatePositions', {positions: Positions});

});


});
