// import packages
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
// import "../index.css";
import MessageComponent from '../Message/MessagePage';
import MessagePage from '../Message/MessagePage';


// Making the App component
class App extends Component {

    render() {

        return (
            <div>
                <MessagePage />
                {/* <form action="">
                    <input id="input" autoComplete="off" onChange={(event) => {this.typeHandler(event)}} /><button onClick={(event) => {this.clickHandler(event)}}>Send</button>
                </form> */}
            </div>
        )
    }
}

export default App;