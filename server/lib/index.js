'use strict';

var _path = require('path');

var _routing = require('./middleware/routing.mw');

var _routing2 = _interopRequireDefault(_routing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var http = require('http');
var socketIO = require('socket.io');

var CLIENT_PATH = (0, _path.join)(__dirname, '../../client');

// our localhost port
var port = 4001;

var app = express();

app.use(_routing2.default);

// our server instance
var server = http.createServer(app);

// This creates our socket using the instance of the server
var io = socketIO(server);

// This is what the socket.io syntax is like, we will work this later
io.on('connection', function (socket) {
  console.log('User connected');

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

app.use(express.static(CLIENT_PATH));

server.listen(port, function () {
  return console.log('Listening on port ' + port);
});