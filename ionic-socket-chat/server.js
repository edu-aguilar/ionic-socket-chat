var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
    'use strict';
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/www'));

// Chat Room vars
var usernames = {};
var numUsers = 0;

io.on('connection', function (socket) {
    'use strict';

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
        // we store the username in the socket session for this client
        socket.username = username;
        // add the client's username to the global list
        usernames[username] = username;
        ++numUsers;
        // Send events
        socketBroadcast('user joined');
        ioEmit('welcome');
    });

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
        socketBroadcast('new message', data);
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', function () {
        socketBroadcast('typing');
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', function () {
        socketBroadcast('stop typing');
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        --numUsers;
        socketBroadcast('user left');
    });

    // Private Functions
    function socketBroadcast(e, data) {
        socket.broadcast.emit(e, {
            username: socket.username,
            users: usernames,
            numUsers: numUsers,
            message: data ? data : null,
        });
    }

    function ioEmit(e) {
        io.to(socket.id).emit(e, {
            username: socket.username,
            users: usernames,
            numUsers: numUsers,
        });
    }
});
