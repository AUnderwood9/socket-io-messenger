$(function(){
    let socket = io.connect("http://localhost:3000");

    // butttons and inputs 
    let message = $("#message");
    let username = $("#username");
    let send_message = $("#send_message");
    let send_username = $("#send_username");
    let chatroom = $("#chatroom");

    // Emit a message
    send_message.click(() => {
        socket.emit("new_message", {message: message.val()});
    })

    // listen on a new_message
    socket.on("new_message", (data) => {
        console.log(data);
        chatroom.append("<p class='message'>" + data.username + ":" + data.message + "</p>");
    })

    // Emit a username
    send_username.click(() => {
        console.log(username.val());
        socket.emit("change_username", {username: username.val()});
    });
})