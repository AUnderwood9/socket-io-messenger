"use strict";

var _path = require("path");

var _routing = require("./middleware/routing.mw");

var _routing2 = _interopRequireDefault(_routing);

var _myUtilities = require("./utils/myUtilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var http = require('http');
var socketList = [];
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
  console.log("User: " + socket.id + " connected. Listings: ", socketList);

  socket.on("join", function (userNameToJoin) {
    socket.join(userNameToJoin + "-room", function (socket) {
      console.log("Welcome " + userNameToJoin);

      // socketList.push(userNameToJoin);

      // io.of(`${userNameToJoin}-room`).emit(`${userNameToJoin}-convo`, {msg: `Hai ${userNameToJoin}`});
    });
  });

  socket.on('disconnect', function () {
    console.log("User: " + socket.id + " disconnected");

    // Reset the lists of users connected
    socketList.splice(0, socketList.length);

    // Make sure the socket frees its connection
    socket.disconnect();
  });

  socket.on("send message", function (chatObj) {
    console.log("chatting", chatObj);

    var openChat = true;
    var foundUser = (0, _myUtilities.getExistingElement)(chatObj.userTo, socketList);
    console.log(foundUser);

    if (!(0, _myUtilities.isUndefined)(foundUser)) {
      console.log("--found in send--", chatObj.userTo, "chatting to: ", chatObj.userTo);
      openChat = false;
      io.emit("chat-to-" + chatObj.userTo, { userFrom: chatObj.userFrom, msg: chatObj.msg, openChat: openChat });
    } else {
      console.log("new chat started");
      socketList.push(chatObj.userTo, chatObj.userFrom);
      io.emit("chat-to-" + chatObj.userTo, { userFrom: chatObj.userFrom, msg: chatObj.msg, openChat: openChat });
    }

    console.log("--Chatting--", chatObj);

    // io.emit(`chat-to-${chatObj.userTo}`, {userFrom: chatObj.userFrom, msg: chatObj.msg, openChat});
  });

  socket.on("private message", function (chatObj) {
    console.log("--sending pm--");

    io.emit("new-chat-to-" + chatObj.userTo, { userFrom: chatObj.userFrom, msg: chatObj.msg, openChat: false });
  });

  socket.on("chat activation", function (activationObj) {

    activationObj.activate = true;
    activationObj.currSessionId = socket.id;

    // console.log("--relaying--", activationObj);


    console.log("I am in " + activationObj.userTo + "-room socketList " + socketList);
    var openChat = true;
    var foundUser = (0, _myUtilities.getExistingElement)(activationObj.userTo, socketList);
    console.log(foundUser);

    if (!(0, _myUtilities.isUndefined)(foundUser)) {
      console.log("found");
      openChat = false;
    } else {
      socketList.push(activationObj.userTo);
    }

    io.of(activationObj.userTo + "-room").emit(activationObj.userTo + "-convo", { msg: "Whats up", openChat: openChat });

    io.emit("activate chat", activationObj);

    // also create a room using userName in activationObj
  });
});