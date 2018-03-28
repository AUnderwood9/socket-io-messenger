import React, { Component, Fragment } from "react";
import LiveChatBox from "../LiveChatBox/LiveChatBox";
import socketIOClient from 'socket.io-client';
// import io from "socket.io"
import SetUserTo from "../SetUserContainer/SetUserContainer";
import SetUser from "../LoginPage/LoginPage";
import { getExistingElement } from "../../../utils/myUtilities";

class LiveChatContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            userTo: "",
            userTolist: [],
            chatId: "",
            chatBoxRenders: [
                "SetUser"
            ],
            joinChat: false,
            chatRoom: ""
        }

        // Create the main socket
        this.socket = socketIOClient("localhost:3001");
    }

    componentDidUpdate(){
        // If the user has joined a chat. Make sure that they will not create another session once render is called.
        if(this.state.joinChat){
            console.log("Stop join");
            this.setState({
                joinChat: !this.state.joinChat
            })
        }
    }

    userNameTypeHandler = (event) => {
        const userName = event.target.value;

        console.log("--typed--", userName);
        this.setState({ userName });


        console.log("--state--", this.state.userName);
    }

    userToTypeHandler = (event) => {
        const userTo = event.target.value;

        console.log("--typed--", userTo);
        this.setState({ userTo });


        console.log("--state--", this.state.userTo);
    }

    userLoginClickHandler = (event) => {
        event.preventDefault();

        let chatBoxRenders = this.state.chatBoxRenders;

        chatBoxRenders.push("SetUserTo");

        this.socket = socketIOClient("localhost:3001");

        this.socket.emit("join", this.state.userName);

        this.setState({
            chatBoxRenders,
            joinChat: !this.state.joinChat,
            chatRoom: socketIOClient(`localhost:3001/${this.state.userName}-room`)
        })

    }

    userToClickHandler = (event) => {
        event.preventDefault();

        const sessionObj = { userName: this.state.userName, userTo: this.state.userTo };
        console.log("--Click--", sessionObj);

        this.socket.emit("chat activation", sessionObj);

        let chatBoxRenders = this.state.chatBoxRenders;
        chatBoxRenders.splice("SetUser", 1);
        chatBoxRenders.push("LiveChatBox");

        this.setState({ chatBoxRenders });
    }



    render() {

        if(this.state.joinChat){
            console.log("Logged in");
            this.state.chatRoom.on(`${this.state.userName}-convo`, (sessionRelayObj) => {

                console.log("--Relayed--", sessionRelayObj);
            });
        }

        return (
            <Fragment>
                <h1>Hello</h1>

                {
                    this.state.chatBoxRenders.map((item, index) => {
                        let returnComponent = null;
                        switch (item) {
                            case "SetUser":
                                // this.paymentForm = <StripeForm/>
                                // returnComponent = <SetUser key={`SetUser-container-${index}`} userNameTypeHandler={this.userNameTypeHandler} userToTypeHandler={this.userToTypeHandler} clickHandler={this.userToClickHandler} />
                                returnComponent = <SetUser key={`SetUser-container-${index}`} userNameTypeHandler={this.userNameTypeHandler} clickHandler={this.userLoginClickHandler} />
                                break;
                            case "SetUserTo":
                                // this.paymentForm = <StripeForm/>
                                // returnComponent = <SetUserTo key={`SetUser-container-${index}`} userNameTypeHandler={this.userNameTypeHandler} userToTypeHandler={this.userToTypeHandler} clickHandler={this.userToClickHandler} />
                                returnComponent = <SetUserTo key={`SetUser-container-${index}`} userToTypeHandler={this.userToTypeHandler} clickHandler={this.userToClickHandler} />
                                break;
                            case "LiveChatBox":
                                // this.paymentForm = <PaypalForm/>
                                // Send id to create unique rooms per chatbox
                                returnComponent = <LiveChatBox key={`LiveChatBox-container-${index}`} sessionUser={this.state.userName} sessionUserTo={null}/>;
                                break;
                            default:
                                //  this.paymentForm = null;
                                returnComponent = null;
                                break;
                        }

                        return returnComponent;
                    })
                }
            </Fragment>
        );
    }
}

export default LiveChatContainer;