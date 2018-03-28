import React, { Component, Fragment } from 'react';
import socketIOClient from 'socket.io-client';

// import LiveChat from "../LiveChatContainer/LiveChatContainer";
import LiveChat from "../LiveChatContainer/LiveChatContainer";
import SetUser from "../SetUserContainer/SetUserContainer";

// import { getExistingElement } from "../../../utils/myUtilities"; 
// import ChatBoxStyle from "./MessagePage.scss";

// Making the App component
class App extends Component {
    constructor(props) {
        super(props)

    }


    render(){
        return (
            <Fragment>
                {/* <SetUser /> */}
                <LiveChat />
            </Fragment>
        );
    }

}

export default App;