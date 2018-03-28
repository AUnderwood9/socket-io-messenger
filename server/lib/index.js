'use strict';

var _path = require('path');

var _routing = require('./middleware/routing.mw');

var _routing2 = _interopRequireDefault(_routing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var http = require('http');
// const socketIO = require('socket.io')
// const io = require("socket.io")();

var CLIENT_PATH = (0, _path.join)(__dirname, '../../client');

// our localhost port
var port = 3001;

var app = express();

var server = require('http').Server(app);

// This creates our socket using the instance of the server
var io = require('socket.io')(server);

server.listen(port);

app.use(_routing2.default);

app.use(express.static(CLIENT_PATH));

// This is what the socket.io syntax is like
io.on('connection', function (socket) {
  console.log('User: ' + socket.id + ' connected');

  socket.on("join", function (userNameToJoin) {
    socket.join(userNameToJoin + '-room', function (socket) {
      console.log('Welcome ' + userNameToJoin);

      io.of(userNameToJoin + '-room').emit(userNameToJoin + '-convo', { msg: 'Hai ' + userNameToJoin });
    });
  });

  socket.on('disconnect', function () {
    console.log('User: ' + socket.id + ' disconnected');
  });

  socket.on("chat message", function (currentMessageObj) {
    console.log("--emitted--", currentMessageObj);

    io.emit("relay message", currentMessageObj);
  });

  socket.on("chat activation", function (activationObj) {

    activationObj.activate = true;
    activationObj.currSessionId = socket.id;

    // console.log("--relaying--", activationObj);

    socket.join(activationObj.userTo + '-room', function (socket) {
      console.log('I am in ' + activationObj.userTo + '-room');

      io.of(activationObj.userTo + '-room').emit(activationObj.userTo + '-convo', { msg: 'Whats up' });
    });

    io.emit("activate chat", activationObj);

    // also create a room using userName in activationObj
  });
});