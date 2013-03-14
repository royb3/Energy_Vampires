var dragging = false;
var selectedHud = null;
var mousediff = {x: 0, y:0};
var positions = {
  performance:  {x: 661, y:11},
  actions: {x: 8, y:8},
  players: {x: 307, y:9},
  trips: {x: 457, y:10}
};
var markerHash = {}

//Set a cookie
var setCookie = function (name,value,days)
{
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
};

//Read a cookie value
var getCookie = function (name)
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
};

//Delete a cookie
var deleteCookie = function (name)
{
    iPadPopup.setCookie(name,"",-1);
};

function humanReadable(bytes, precision)
{	
       var kilobyte = 1024;
       var megabyte = kilobyte * 1024;
       var gigabyte = megabyte * 1024;
       var terabyte = gigabyte * 1024;
       
       if ((bytes >= 0) && (bytes < kilobyte)) {
               return bytes + ' B';

       } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
               return (bytes / kilobyte).toFixed(precision) + ' KB';

       } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
               return (bytes / megabyte).toFixed(precision) + ' MB';

       } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
               return (bytes / gigabyte).toFixed(precision) + ' GB';

       } else if (bytes >= terabyte) {
               return (bytes / terabyte).toFixed(precision) + ' TB';

       } else {
               return bytes + ' B';
       }
};

function saveHudPositions()
{
    setCookie('HUDpositions', $.toJSON(positions), 365);
}

function loadHudPositions()
{
    value = getCookie('HUDpositions');
    if (value != null)
    {
        positions = $.evalJSON(value);
        for(var i in positions)
        {
            $("#"+i).css('left', positions[i].x);
            $("#"+i).css('top', positions[i].y);
        }
    }
}

function activateHudInterface()
{
    $(".HUD h2").mousedown(function (e) {
        console.log("started dragging");
        selectedHud = $(this).parent();
        dragging = true;
        var left = parseInt($(selectedHud).css('left'));
        var top = parseInt($(selectedHud).css('top'));
        
        mousediff.x = left - e.pageX;
        mousediff.y = top - e.pageY;
    })
    $(".HUD h2").mouseup(function (){
        selectedHud = null;
        dragging = false;
        mousediff.x = 0;
        mousediff.y = 0;
        saveHudPositions();
    });
    $(window).mousemove(function(ev) {
        if (dragging == true)
        {
            $(selectedHud).css('left', ev.pageX + mousediff.x);
            $(selectedHud).css('top', ev.pageY + mousediff.y);
            positions[$(selectedHud).attr('id')] = {x: ev.pageX + mousediff.x, y: ev.pageY + mousediff.y};
        }
    });
    $(".HUD h2").each(function () {
        $(this).append($('<span class="minimize"></span>'))    
    });
    $(".HUD h2 .minimize").click(function (){
        console.log("minimizing window");
        var hud = $(this).parents(".HUD");
        if (hud.hasClass("minimized"))
        {
            hud.removeClass("minimized");
        }
       else
        {
            hud.addClass("minimized");
        }
    });
};



function refreshPlayerList(player)
{
    var list = ""
        
    $('#playerList').html(list);
    
    if (game.players.length == 0)
    {
        $('#playerList').html("No players connected.");
        return;
    }
    
    for (var p in game.players)
    {
            $('#playerList').append($("<p>" + game.players[p].nickname + ' </p>').append($('<a class="player" href="#" data-player="' +game.players[p].id+ '" >kill</a>')
                                                                                         .click(function () {
                                                                                            var id = $(this).attr("data-player");
                                                                                            for (var pl in game.players)
                                                                                            {
                                                                                                    if (game.players[pl].id == id) game.killPlayer(game.players[pl]);
                                                                                            }
                                                                                            return false;
                                                                                            })));	
    }
    $('a.player').each(function ()
                    {
                            var id = $(this).attr("data-player");
                            var link = $('<a href="#"> Record</a>').click(function () {
                                            game.requestRecording(id,  "Trip" + Date.now());
                                            return false;
                                    });
                            $(link).insertAfter($(this));
                    });
}


//On load      
$(function ()
  {
    // When a player joins or leaves: refresh the list and create the action links
    game.bind("playerJoined", refreshPlayerList);
    game.bind("playerDisconnected", refreshPlayerList);
    
    
    //Update memory information
    game.bind("memoryUsage", function(data){
                var rss = data.rss;
                var heapTotal = data.heapTotal;
                var heapUsed = data.heapUsed;
                var percentage = parseFloat(heapUsed)/parseFloat(heapTotal)*100;
                
                $("#memoryText").text( humanReadable(rss, 2));
                $("#memory").css('width', percentage + "%");
    });
    
    game.bind("listTrips", function(tripsList){
        console.log("Refreshing trips list");
        $('#tripsList .trip').remove();
        for (var t in game.trips)
        {
                console.log("adding trip: " + game.trips[t]);
                $('#tripsList').append($('<a class="trip" href="#" onClick="game.replayTrip(\'' + game.trips[t] + '\', 2)">' +game.trips[t]+ '</a>'));
        }
    });
    
    //Ask for the first update of the list of trips.
    game.listTrips();
    
    //Ask for memory usage information every second
    setInterval(function(){game.socket.emit("memoryUsage")}, 1000);
    
    activateHudInterface();
    loadHudPositions();
    gmaps.initializeMap(gmaps.defaultCenter, 'Map');
    
    game.bind('updateLocation', function (player, location) {
        if (markerHash[player.id] == undefined)
        {
            markerHash[player.id]  = gmaps.addMarker(player.nickname, location, gmaps.maps[0].map, "/images/geomarker.png");
        }
        else
        {
            markerHash[player.id].setPosition(new google.maps.LatLng(location.lat, location.lng));
        }
    });
});