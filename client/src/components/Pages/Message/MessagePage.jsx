import React, { Component } from "react";
import socketIOClient from 'socket.io-client';
import MessagePiece from "../../Pieces/Message";
// import ChatBoxStyle from "./MessagePage.scss";

class MessagePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <ul id="messages">
                {/* <MessagePiece /> */}
                {
                    this.props.messageContent.map((item, index) => {
                        return <MessagePiece key={`message-piece-${index}`} currentMessage={item} />
                    })
                }
            </ul>

        );
    }
}

export default MessagePage;