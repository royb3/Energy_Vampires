// Creating global parameters and start
// listening to 'port', we are creating an express
// server and then we bind it with the socket.io
var express   = require('express');
    app       = express();
    server    = require('http').createServer(app);
    io        = require('socket.io').listen(server);
    port      = 80,


    // Hash objects to save clients data
    // For example: clientid, username.

    chatClients = new Object();

// Listening to port
server.listen(port);