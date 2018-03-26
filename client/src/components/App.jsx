// import packages
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
// import "../index.css";

// Making the App component
class App extends Component {
    constructor() {
        super()

        this.state = {
            message: ""
        }

    }

    typeHandler = (event) => {
        let message = event.target.value
        console.log("--typed--", message);
        this.setState({message});
        console.log("--state--", this.state.message);
    }

    clickHandler = (event) => {
        event.preventDefault();
        // console.log(event.val);
        console.log("--Click--", this.state.message);

        let socket = socketIOClient();
        socket.emit("chat message", this.state.message);
    }

    render() {

        return (
            <div>
                <ul id="messages"></ul>
                <form action="">
                    <input id="input" autoComplete="off" onChange={(event) => {this.typeHandler(event)}} /><button onClick={(event) => {this.clickHandler(event)}}>Send</button>
                </form>
            </div>
        )
    }
}

export default App;