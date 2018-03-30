import React, { Component } from "react";
import socketIOClient from 'socket.io-client';
import MessagePiece from "../../Pieces/Message";
// import ChatBoxStyle from "./MessagePage.scss";

function MessagePage (props) {

        return (

            <ul id="messages">
                {/* <MessagePiece /> */}
                {
                    props.messageContent.map((item, index) => {
                        // return <MessagePiece key={`message-piece-${index}`} currentMessage={item} />
                        return <li key={`li-${props.boxId}-${index}`}>{item}</li>
                    })
                }
            </ul>

        )

}

export default MessagePage;