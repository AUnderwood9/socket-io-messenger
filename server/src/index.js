import { join } from 'path';
import stateRouting from "./middleware/routing.mw";
import { getExistingElement, isUndefined } from "./utils/myUtilities";

const express = require('express')
const http = require('http')
let socketList = [];
// const socketIO = require('socket.io')
// const io = require("socket.io")();

const CLIENT_PATH = join(__dirname, '../../client');

// our localhost port
const port = 3001;

const app = express();


const server = require('http').Server(app);

// This creates our socket using the instance of the server
const io = require('socket.io')(server);

server.listen(port);

app.use(stateRouting);

app.use(express.static(CLIENT_PATH));


// This is what the socket.io syntax is like
io.on('connection', socket => {
  console.log(`User: ${socket.id} connected. Listings: `, socketList);

  socket.on("join", (userNameToJoin) => {
    socket.join(`${userNameToJoin}-room`, socket => {
      console.log(`Welcome ${userNameToJoin}`);

      // socketList.push(userNameToJoin);

      // io.of(`${userNameToJoin}-room`).emit(`${userNameToJoin}-convo`, {msg: `Hai ${userNameToJoin}`});
    })
  })
  
  socket.on('disconnect', () => {
    console.log(`User: ${socket.id} disconnected`);

    // Reset the lists of users connected
    socketList.splice(0, socketList.length);

    // Make sure the socket frees its connection
    socket.disconnect();
  })

  socket.on("send message", (chatObj) => {
    console.log("chatting", chatObj);

    let openChat = true;
    const foundUser = getExistingElement(chatObj.userTo, socketList);
    console.log(foundUser);

    if(!isUndefined(foundUser) ){
      console.log("--found in send--", chatObj.userTo, "chatting to: ", chatObj.userTo);
      openChat = false;
      io.emit(`chat-to-${chatObj.userTo}`, {userFrom: chatObj.userFrom, msg: chatObj.msg, openChat});
    } else {
      console.log("new chat started");
      socketList.push(chatObj.userTo, chatObj.userFrom);
      io.emit(`chat-to-${chatObj.userTo}`, {userFrom: chatObj.userFrom, msg: chatObj.msg, openChat})
    }

    console.log("--Chatting--", chatObj);

    // io.emit(`chat-to-${chatObj.userTo}`, {userFrom: chatObj.userFrom, msg: chatObj.msg, openChat});
  })

  socket.on("private message", (chatObj) => {
    console.log("--sending pm--");

    io.emit(`new-chat-to-${chatObj.userTo}`, {userFrom: chatObj.userFrom, msg: chatObj.msg, openChat: false})
  })

  socket.on("chat activation", (activationObj) => {

    activationObj.activate = true;
    activationObj.currSessionId = socket.id;

    // console.log("--relaying--", activationObj);


      console.log(`I am in ${activationObj.userTo}-room socketList ${socketList}`);
      let openChat = true;
      const foundUser = getExistingElement(activationObj.userTo, socketList);
      console.log(foundUser);

      if(!isUndefined(foundUser) ){
        console.log("found")
        openChat = false;
      } else {
        socketList.push(activationObj.userTo)
      }

      io.of(`${activationObj.userTo}-room`).emit(`${activationObj.userTo}-convo`, {msg: `Whats up`, openChat});


    io.emit("activate chat", activationObj);

    // also create a room using userName in activationObj
  })
});
