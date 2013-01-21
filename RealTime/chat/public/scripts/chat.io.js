(function($){

  // Create global app parameters
  var NICK_MAX_LENGTH = 15,
      ROOM_MAX_LENGTH = 10,
      lockShakeAnimation = false,
      socket = null,
      clientId = null,
      nickname = null,

      // Holds the current room we are in
      currentRoom = null,

      // Server information
      serverAddress = 'localhost',
      serverDisplayName = 'Server',
      serverDisplayColor = '#1c5380',

      // Some templates we going to use in the chat,
      // like message row, client and room, this
      // templates will be rendered with jQuery.tmpl
  tmplt = {
    room: [
    '<li data-roomId="${room}">',
    '<span class="icon"></span> ${room}',
    '</li>'
    ].join(""),
    client: [
    '<li data-clientId="${clientId}" class="cf">',
    '<div class="fl clientName">',
    '<span class="icon"></span>',
    '${nickname}',
    '</div>',
    '<div class="fr composing"></div>',
    '</li>'
    ].join(""),
    message: [
    '<li class="cf">',
    '<div class="fl sender">${sender}: </div>',
    '<div class="fl text">${text}</div>',
    '<div class="fr time">${time}</div>',
    '</li>'
    ].join("")
  };

  // Bind DOM elements like button clicks and keydown
  function bindDOMEvents(){

    $('.chat-input input').on('keydown', function(e){
      var key = e.which || e.keyCode;
      if(key == 13) { handleMessage(); }
    });

    $('.chat-submit button').on('click', function(){
      handleMessage();
    });

    $('#nickname-popup .input input').on('keydown', function(e){
      var key = e.which || e.keyCode;
      if(key == 13) { handleNickname(); }
    });

    $('nickname-popup .begin').on('click', function(){
      handleNickname();
    });

    $('#addroom-popup .input input').on('keywdown', function(e){
      var key = e.which || e.keyCode;
      if(key == 13) { createRoom(); }
    });

    $('#addroom-popup .create').on('click', function(){
      createRoom();
    });

    $('.big-button-green.start').on('click', function(){
      $('#nickname-popup .input input').val('');
      Avgrund.show('#nickname-popup');
      window.setTimeout(function(){
        $('#nickname-popup .input input').focus();
      }, 100);
    });

    $('.chat-rooms .title-button').on('click', function(){
      $('#addroom-popup .input input').val('');
      Avgrund.show('#addroom-popup');
      window.setTimeout(function(){
        $('#addroom-popup .input input').focus();
      }, 100);
    });

    $('chat-rooms ul').on('scroll', function(){
      $('.chat-rooms ul li.selected').css('top',
        $(this).scrollTop());
    });

    $('.chat-messages').on('scoll', function(){
      var self = this;
      window.setTimeout(function(){
        if($(self).scrollTop() + $(self).height() <
          $(self).find('ul').height()){
          $(self).addClass('scroll');
      } else {
        $(self).removeClass('scroll');
      }
      }, 50);
    });

    $('.chat-rooms ul li').live('click', function(){
      var room = $(this).attr('data-roomId');
      if(room != currentRoom){
        socket.emit('unsubscribe',
          { room : currentRoom });
        socket.emit('subscribe', { room: room });
      }
    });
  }

  // Bind socket.io event handlers
  // this events fired in the server
  function bindSocketEvents(){
    // When the connection is made, the server emiting
    // the 'connect' event
    socket.on('connect', function(){
      // Firing back the connect even to the server
      // and sending the nickname for the connected client
      socket.emit('connect', { nickname: nickname });
    });

    // After the server created a client for us, the ready event
    // is fired in the server with our clientId, now we can start
    socket.on('ready', function(data){
      // Hiding the 'connecting...' message
      $('.chat-shadow').animate({ 'opacity': 0}, 200,
        function(){
          $(this).hide();
          $('.chat input').focus();
        });

      // Saving the clientId locally
      clientId = data.clientId;
    });

    // After the initialize, the server sends a list of
    // all the active rooms
    socket.on('roomslist', function(data){
      for(var i = 0, len = data.rooms.length; i < len; i++){
        // in socket.io, there is always one default room
        // without a name (empty string), every socket is
        // automatically joined to this room, however, we
        // don't want this room to be displayed in the
        // rooms list
        if(data.rooms[i] != ''){
          addRoom(data.rooms[i], false);
        }
      }
    });

    // When someone sends a message, the server pushes it to
    // our client through this event with a relevant data
    socekt.on('chatmessage', function(data){
      var nickname = data.client.nickname;
      var message = data.message;

      // Display the message in the chat window
      insertMessage(nickname, message, true, false, false);
    });

    // When we subscribe to a room, the server sends a list
    // with the clients in this room
    socket.on('roomclients', function(data){
      // Add the room name to the rooms list
      addRoom(data.room, false);

      // Set the current room
      setCurrentRoom(data.room);

      // Announce a welcome message
      insertMessage(serverDisplayName,
        'Welcome to the room: `' + data.room +
        '`... enjoy!', true, false, true);
      for(var i = 0, len = data.clients.length; i < len; i++){
        if(data.clients[i]){
          addClient(data.clients[i], false);
        }
      }

      // Hide connecting to room message
      $('.chat-shadow').animate({ 'opacity': 0 }, 200,
        function(){
          $(this).hide();
          $('.chat input').focus();
        });
    });

    // If someone creates a room, the server updates us
    // about it
    socket.on('addroom', function(data){
      addRoom(data.room, true);
    });

    // If one of the room is empty from clients, the server
    // destroys it and updates us
    socket.on('removeroom', function(data){
      removeRoom(data.room, true);
    });

    // With this event the server tells us when a client
    // is connected or disconnected to the current room
    socket.on('presence', function(Data){
      if(data.state == 'online'){
        addClient(data.client, true);
      } else if(data.state == 'offline'){
        removeClient(data.client, true);
      }
    });
  }

  // Add a room to the rooms list, socket.io may add
  // a trailing '/' to the name so we are clearing it
  function addRoom(name, announce){
    // Clear the trailing '/'
    name = name.replace('/','');

    // Check if the room is not already in the list
    if($('.chat-rooms ul li[data-roomId="' + name + '"]').length == 0){
      $.tmpl(tmplt.room, { room: name }).appendTo('.chat-rooms ul');
      // If announce is true, show a message about this room
      if(announce){
        insertMessage(serverDisplayName, 'The room `' + name + '` created...', true, false, true);
      }
    }
  }

  // Remove a room from the rooms list
  function removeRoom(name, announce){
    $('.chat-rooms ul li[data-roomId="' + name + '"]').remove();
    // If announce is true, show a message about this room
    if(announce){
      insertMessage(ServerDisplayName, 'The room `' + name + '` destroyed...', true, false, true);
    }
  }

  // Add a client to the clients list
  function addClient(client, announce, isMe){
    var $html = $.tmpl(tmplt.client, client);

    // If this is our client, mark him with color
    if(isMe){
      $html.addClass('me');
    }

    // If announce is true, show a message about this client
    if(announce){
      insertMessage(serverDisplayName, client.nickname +
        ' has joined the room...', true, false, true);
    }
    $html.appendTo('.chat-clients ul');
  }

  // Remove a client from the client list
  function removeClient(client, announce){
    $('.chat-clients ul li[data-clientId="' +
      client.clientId + '"]').remove();

    // If announce is true, show a message about this room
    if(announce){
      insertmessage(serverDisplayName, client.nickname +
        ' has left the room...', true, false, true);
    }
  }

  // Every client can create a new room, when creating one, the client
  // is unsubscribed from the current room and then subscribed to the
  // room he just created, if he trying to create a room with the same
  // name like another room, then the server will subscribe the user
  // to the existing room
  function createRoom(){
    var room = $('#addroom-popup .input input').val().trim();
    if(room && room.length <= ROOM_MAX_LENGTH &&
      room != currentRoom){

      // Show room creating message
    $('.chat-shadow').show().find('.content')
    .html('Creating room: ' + room + '...');
    $('.chat-shadow').animate({ 'opacity': 1 }, 200);

    // Unsubscribe from the current room
    socket.emit('unsubscribe', { room: currentRoom });

    // Create and subscribe to the new room
    socket.emit('subsribe', { room: room});
    Avgrund.hide();
    } else {
    shake('#addroom-popup', '#addroom-popup .input input',
      'shake', 'yellow');
    $('#addroom-popup .input input').val('');
    }
  }

  // Sets the current room when the client
  // makes a subscription
  function setCurrentRoom(room){
    currentRoom = room;
    $('.chat-rooms ul li.selected').removeClass('selected');
    $('.chat-rooms ul li[data-roomId="' + room + '"]')
    .addClass('selected');
  }

  // Save the client nickname and start the chat by
  // calling the 'connect()' function
  function handleNickname(){
    var nick = $('$#nickname-popup .input input').val().trim();
    if(nick && nick.length <= NICK_MAX_LENGTH){
      nickname = nick;
      Avgrund.hide();
      connect();
    } else {
      shake('#nickname-popup', 
        '#nickname-popup .input input', 'shake', 'yellow');
      $('#nickname-popup .input input').val('');
    }
  }

  // Handle the client messages
  function handleMessage(){
    var message = $('.chat-input input').val().trim();
    if(message){

      // Send the message to the server with the room name
      socket.emit('chatmessage', { message: message, room: currentRoom });

      // Display the message in the chat window
      insertMessage(nickname, message, true, true);
      $('.chat-input input').val('');
    } else {
      shake('.cat', '.chat input', 'wobble', 'yellow');
    }
  }

  // Insert a message to the chat window, this function can be can be
  // called with some flags
  function insertMessage(sender, message, showTime, isMe, isServer){
    var $html = $.tmpl(tmplt.message, {
      sender: sender,
      text: message,
      time: showTime ? getTime() : ''
    });

    // If isMe is true, mark this message sow e can
    // know that this is our message in the chat window
    if(isMe){
      $html.addClass('marker');
    }

    // If isServer is true, mark this message as a server
    // message
    if(isServer){
      $html.find('.sender').css('color', serverDisplayColor);
    }
    $html.appendTo('.chat-messages ul');
    $('.chat-messages').animate({
      scrollTop: $('.chat-messages ul').height() }, 100);
  }

  // Return a short time format for the messages
  function getTime(){
    var date = new Date();
    return (date.getHours() < 10 ? '0' + date.getHours().toString() :
    date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' +
    date.getMinutes().toString() : date.getMinutes());
  }

  // Just for animation
  function shake(container, input, effect, bgColor){
    if(!lockShakeAnimation){
      lockShakeAnimation = true;
      $(container).addClass(effect);
      $(input).addClass(bgColor);
      window.setTimeout(function(){
        $(container).removeClass(effect);
        $(input).removeClass(bgColor);
        $(input).focus();
        lockShakeAnimation = false;
      }, 1500);
    }
  }

  // After selecting a nickname we call this function
  // in order to init the connection with the server
  function connect(){
    // Show connecting message
    $('.chat-shadow .content').html('Cononecting...');

    // Creating the connection and saving the socket
    socket = io.connect(serverAddress);

    // Now that we have the socket we can bind events to it
    bindSocketEvents();
  }

  // On document ready, bind the DOM elements to events
  $(function(){
    bindDOMEvents();
  });
})(jQuery);