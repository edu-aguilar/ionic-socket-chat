// Setup basic express server
var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/www'));

// Chat Room vars
var usernames = {};
var numUsers = 0;

//var rooms = [];

io.on('connection', function (socket) {

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {

    // we store the username in the socket session for this client
    socket.username = username;

    // add the client's username to the global list
    usernames[username] = username;
    ++numUsers;

    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers,
    });
  });

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data,
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username,
    });
  });

  // TODO Add Rooms
  // when the client emits 'join', we broadcast it to others
  // socket.on('join', function (room) {
  //   socket.room = room;
  //   socket.join(socket.room);
  //   socket.broadcast.emit('user joined room', {
  //     username: socket.username,
  //     room: socket.room,
  //   });
  // });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username,
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    --numUsers;

    // echo globally that this client has left
    socket.broadcast.emit('user left', {
      username: socket.username,
      numUsers: numUsers,
    });
  });
});
