import { join } from 'path';
import stateRouting from "./middleware/routing.mw";
const express = require('express')
const http = require('http')
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
  console.log(`User: ${socket.id} connected`);

  socket.on("join", (userNameToJoin) => {
    socket.join(`${userNameToJoin}-room`, socket => {
      console.log(`Welcome ${userNameToJoin}`);

      io.of(`${userNameToJoin}-room`).emit(`${userNameToJoin}-convo`, {msg: `Hai ${userNameToJoin}`});
    })
  })
  
  socket.on('disconnect', () => {
    console.log(`User: ${socket.id} disconnected`)
  })

  socket.on("chat message", (currentMessageObj) => {
    console.log("--emitted--", currentMessageObj);


    io.emit("relay message", currentMessageObj)
  })

  socket.on("chat activation", (activationObj) => {

    activationObj.activate = true;
    activationObj.currSessionId = socket.id;

    // console.log("--relaying--", activationObj);

    socket.join(`${activationObj.userTo}-room`, socket => {
      console.log(`I am in ${activationObj.userTo}-room`);

      io.of(`${activationObj.userTo}-room`).emit(`${activationObj.userTo}-convo`, {msg: `Whats up`});
    })

    io.emit("activate chat", activationObj);

    // also create a room using userName in activationObj
  })
});
