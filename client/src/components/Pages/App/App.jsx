// import packages
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
// import "../index.css";
import MessageComponent from '../Message/MessagePage';
import MessageBox from '../Message/MessagePage';


// Making the App component
class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: "",
            sessionMessages: []
        }

        // this.socket = socketIOClient("http://localhost:4002");
        // console.log(this.socket);
        // let sessionMessages = this.state.sessionMessages;
        // this.socket.on("relay message", (newMessage) => {
        //     console.log("--relay--", newMessage);
        //     sessionMessages.push(newMessage);
        //     this.setState({ sessionMessages });
        // });

    }

    componentDidMount(){
        this.socket = socketIOClient("localhost:4001");
        console.log(this.socket);
        let sessionMessages = this.state.sessionMessages;
        this.socket.on("relay message", (newMessage) => {
            console.log("--relay--", newMessage);
            sessionMessages.push(newMessage);
            this.setState({ sessionMessages });
        });
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

        this.socket.emit("chat message", this.state.message);
    }

    render() {

        return (
            <div>
                <MessageBox typeHandler={this.typeHandler} clickHandler={this.clickHandler} messageContent={this.state.sessionMessages}/>
                {/* <form action="">
                    <input id="input" autoComplete="off" onChange={(event) => {this.typeHandler(event)}} /><button onClick={(event) => {this.clickHandler(event)}}>Send</button>
                </form> */}
            </div>
        )
    }
}

export default App;