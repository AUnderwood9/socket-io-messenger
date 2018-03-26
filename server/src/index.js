import { join } from 'path';
import stateRouting from "./middleware/routing.mw";
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const CLIENT_PATH = join(__dirname, '../../client');

// our localhost port
const port = 4001

const app = express();

app.use(stateRouting);

app.use(express.static(CLIENT_PATH));

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like
io.on('connection', socket => {
  console.log('User connected')
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on("chat message", (currentMessage) => {
    console.log("--emitted--", currentMessage);

    let newMessage = "What's happenin'!";

    // socket.emit("relay message", newMessage);
    socket.emit("relay message", currentMessage);
  })
});

server.listen(port, () => console.log(`Listening on port ${port}`))