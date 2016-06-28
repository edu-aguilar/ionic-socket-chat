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
var rooms = ['default'];

io.on('connection', function (socket) {

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {

    // we join the user to the default room
    socket.join(rooms[0]);

    // we store the username and room in the socket session for this client
    socket.username = username;
    socket.room = rooms[0];

    // add the client's username to the global list
    usernames[username] = username;
    ++numUsers;

    // echo globally (all clients) that a person has connected
    socket.broadcast.to(socket.room).emit('user joined', {
      username: socket.username,
      numUsers: numUsers,
      room: socket.room,
    });
  });

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.to(socket.room).emit('new message', {
      username: socket.username,
      message: data,
      room: socket.room,
    });
  });

  // when the client emits 'join', this listens and executes
  socket.on('join', function (data) {
    socket.room = data.room;
    socket.join(data.room);
  });

  // when the client emits 'leave', this listens and executes
  socket.on('leave', function (data) {
    socket.leave(data.room);
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.to(socket.room).emit('typing', {
      username: socket.username,
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.to(socket.room).emit('stop typing', {
      username: socket.username,
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    --numUsers;

    // echo globally that this client has left
    socket.broadcast.to(socket.room).emit('user left', {
      username: socket.username,
      numUsers: numUsers,
    });
  });
});
