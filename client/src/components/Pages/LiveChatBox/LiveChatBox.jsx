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

        this.state = {
            message: "",
            sessionMessages: [],
            user: "",
            userTo: "",
            userList: []
        }

        this.socket = socketIOClient("localhost:3001");

    }

    componentDidMount() {

        // Set socket listener here
        // this.socket = socketIOClient("localhost:4001");
        // // console.log(this.socket);
        // let sessionMessages = this.state.sessionMessages;
        // this.socket.on("relay message", (newMessage) => {
        //     const userTo = this.state.userTo;

        //     const currentUser = getExistingElement(userTo, this.state.userList);

        //     console.log("--current user--", currentUser);

        //     if (!currentUser) {
        //         let userList = this.state.userList;
        //         userList.push(userTo);

        //         this.setState({ userList });
        //     }

        //     console.log("--relay--", newMessage);
        //     sessionMessages.push(newMessage.message);
        //     this.setState({ sessionMessages });

        //     console.log("--state list--", this.state.userList);
        // });

        if(this.props.sessionUser){
            console.log("You recieved a message");
        } else {
            console.log("You are sending message")
        }
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
        // const user = this.state.user;

        // const currentUser = getExistingElement(user, this.state.userList);

        // if(!currentUser){
        //     let userList = this.state.userList;
        //     userList.push(user);

        //     this.setState({ userList });
        // }

        const commentObj = { message: this.state.message, user: this.state.user, userTo: this.state.userTo };
        console.log("--Click--", commentObj);

        this.socket.emit("chat message", commentObj);
    }

    render() {
        // console.log("--state list--", this.state.userList);

        return (
            <Fragment>
                <div className={`${ChatBoxStyle.boxContainer}`}>
                    <MessageBox commentTypeHandler={this.commentTypeHandler} userTypeHandler={this.userTypeHandler} clickHandler={this.clickHandler} messageContent={this.state.sessionMessages} />
                    {/* <MessageInputs commentTypeHandler={this.commentTypeHandler} userTypeHandler={this.userTypeHandler} clickHandler={this.clickHandler} /> */}
                    <MessageInputs commentTypeHandler={this.commentTypeHandler} userTypeHandler={this.userTypeHandler} clickHandler={this.clickHandler} /> 
                </div>
            </Fragment>
        )
    }
}

export default LiveChatBox;