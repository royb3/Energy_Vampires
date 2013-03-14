Mediawerf Game Engine
=====================

Contains the server side for the game with a small HTML5 mobile app for testing 

index.html 					monitor module 
mobile.html 				HTML5 testing app

Monitor and Mobile Javascript in (./js/ folder)
---
client.js						Mobile HTML5 functions 
(bind) - gameEngine.js				This file can be added to any HTML page, bind events to receive information from the server or send info to it
- maps.js							Maps for the admin module
mobile.js						testing mobile app javascript
* monitor.js					Monitor module 
* replay.js						asks for logged info to the server 

Server (server folder)
---
DAL.js							MongoDB functions 
DistanceMatrix.js		
GeoUtils.js 				Library for measuring the distance between two geolocation points 
Player.js						Player class 
server.js 					Main server. Handles connected players and logged information (previously recorded movements)
 
