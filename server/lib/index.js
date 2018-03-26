'use strict';

var _path = require('path');

var _routing = require('./middleware/routing.mw');

var _routing2 = _interopRequireDefault(_routing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
// const io = require("socket.io")();

var CLIENT_PATH = (0, _path.join)(__dirname, '../../client');

// our localhost port
var port = 4001;
var socketPort = 4002;

var app = express();

app.use(_routing2.default);

app.use(express.static(CLIENT_PATH));

// our server instance
// const server = http.createServer(app)
var server = app.listen(port, function () {
  return console.log('Listening on port ' + port);
});

// This creates our socket using the instance of the server
var io = socketIO(server);
// io.listen(port)

// This is what the socket.io syntax is like
io.on('connection', function (socket) {
  console.log('User: ' + socket.id + ' connected');

  socket.on('disconnect', function () {
    console.log('User: ' + socket.id + ' disconnected');
  });

  socket.on("chat message", function (currentMessage) {
    console.log("--emitted--", currentMessage);

    var newMessage = "What's happenin'!";

    // socket.emit("relay message", newMessage);
    io.emit("relay message", 'User: ' + socket.id + ' said: ' + currentMessage);
  });
});

// server.listen(port, () => console.log(`Listening on port ${port}`))

// io.listen(socketPort);