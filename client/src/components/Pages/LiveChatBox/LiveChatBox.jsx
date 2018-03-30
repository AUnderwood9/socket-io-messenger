// import packages
import React, { Component, Fragment } from 'react';
import socketIOClient from 'socket.io-client';
// import "../index.css";
import MessageComponent from '../Message/MessagePage';
import MessageBox from '../Message/MessagePage';
import MessageInputs from "../../Pieces/MessageInputs";

import { getExistingElement } from "../../../utils/myUtilities";
import ChatBoxStyle from "./LiveChatBox.scss";

// Making the App component
class LiveChatBox extends Component {
    constructor(props) {
        super(props)

        // sessionMessages = [];
        // sessionMessages.push(this.props.sessionMsg);

        console.log("--Creating Box--", this.props.sessionUser);

        this.state = {
            message: "",
            sessionMessages: [this.props.sessionMsg],
            user: this.props.sessionUser,
            userTo: this.props.sessionUserTo,
            userList: []
        }

        this.socket = this.props.chatListener;

    }

    componentDidMount(){
        const type = "Comopnent did mount";
        this.initSocketListner(type);
    }


    initSocketListner = (creator = "none") => {
        console.log("Socket init")
        this.socket.on(`new-chat-to-${this.state.userName}`, (sessionRelayObj) => {

            console.log("--Relayed in chat Box--", sessionRelayObj,  "Creator: ", creator);
            
            // this.setState({ sessionMessages: [...this.state.sessionMessages, sessionRelayObj.msg] })
            this.updateMessages(sessionRelayObj.msg);
            
        })
    }

    updateMessages = (msg) => {
        this.setState({ sessionMessages: [...this.state.sessionMessages, msg] })
    }

    userTypeHandler = (event) => {
        const user = event.target.value;

        console.log("--typed--", user);
        this.setState({ user });


        console.log("--state--", this.state.user);
    }

    userToTypeHandler = (event) => {
        const userTo = event.target.value;

        console.log("--typed--", userTo);
        this.setState({ userTo });


        console.log("--state--", this.state.userTo);
    }

    commentTypeHandler = (event) => {
        let message = event.target.value
        console.log("--typed--", message);
        this.setState({ message });
        console.log("--state--", this.state.message);
    }

    clickHandler = (event) => {
        event.preventDefault();

        // const commentObj = { message: this.state.message, user: this.state.user, userTo: this.state.userTo };
        // console.log("--Click--", commentObj);

        // this.socket.emit("chat message", commentObj);

        const sessionObj = { userFrom: this.state.user, userTo: this.state.userTo, msg: this.state.message };
        console.log("--Click--", sessionObj);

        this.socket.emit("send message", sessionObj);
    }

    render() {
        console.log("Rendering");
        return (
            <Fragment>
                <div className={`${ChatBoxStyle.boxContainer}`}>
                    <MessageBox messageContent={this.state.sessionMessages} boxId={`${this.state.user}-${this.state.userTo}`} />
                    <MessageInputs commentTypeHandler={this.commentTypeHandler} userTypeHandler={this.userTypeHandler} clickHandler={this.clickHandler} />
                </div>
            </Fragment>
        )
    }
}

export default LiveChatBox;