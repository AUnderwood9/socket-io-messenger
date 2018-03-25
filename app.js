const express = require("express");

const app = express();

// Set ejs template engine
app.set("view engine", "ejs");

// use middlewares
app.use(express.static("public"));

app.get("/", (req, res) => {
    // res.send("Hello World");
    res.render("index");
});

server = app.listen(3000);

// Soecket.io instantiation
const io = require("socket.io")(server);

// listen on every connection
io.on("connection", (socket) => {
    console.log("new user connected");

    // default user name
    socket.username = "Anonymous";

    // listen on change_username
    socket.on("change_username", (data) => {
        socket.username = data.username;
    });

    socket.on("new_message", (data) => {
        io.sockets.emit("new_message", {message : data.message, username: socket.username});
    })
})