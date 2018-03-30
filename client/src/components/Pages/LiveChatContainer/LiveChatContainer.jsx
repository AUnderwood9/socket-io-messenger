import React, { Component, Fragment } from "react";
import LiveChatBox from "../LiveChatBox/LiveChatBox";
import socketIOClient from 'socket.io-client';
// import io from "socket.io"
import SetUserTo from "../SetUserContainer/SetUserContainer";
import SetUser from "../LoginPage/LoginPage";
import { getExistingElement, isUndefined } from "../../../utils/myUtilities";

class LiveChatContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            userTo: "",
            chatlist: [],
            chatBoxRenders: [
                "SetUser"
            ],
            messageRecievedComponent: null,
            chatListener: null
        }

        // Create the main socket
        this.socket = socketIOClient("localhost:3001");
    }

    componentDidUpdate(){

        if(this.state.chatListener){

            // this.state.chatListener;

            console.log("--componentDidUpdadte", "Logged in");
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

        this.setState({
            chatBoxRenders,
            chatListener: this.socket.on(`chat-to-${this.state.userName}`, (sessionRelayObj) => {

                console.log("--Relayed--", sessionRelayObj);

                // If a chat for this session hasn't been opened. Open a new one.
                if(sessionRelayObj.openChat){
                    // const messageRecievedComponent = <LiveChatBox sessionUser={this.state.userName} sessionUserTo={null} sessionObj={sessionRelayObj}/>
                    if(isUndefined(getExistingElement(sessionRelayObj.userFrom))){
                        console.log("--creating new message box--", this.socket);
                        const messageRecievedComponent = <LiveChatBox sessionUser={this.state.userName} sessionUserTo={sessionRelayObj.userFrom} sessionMsg={sessionRelayObj.msg} chatListener={this.socket} />

                        this.setState({
                            messageRecievedComponent,
                            chatList: this.state.chatList ? [...this.state.chatList, sessionRelayObj.userFrom] : [ sessionRelayObj.userFrom ]
                        })
                    }
                } else{
                    console.log("--Sending pm--")
                    // socketIOClient.emit(`chat-to-${chatObj.userTo}`, sessionRelayObj);
                    // socketIOClient.emit("private message", sessionRelayObj)
                    this.socket.emit("private message", sessionRelayObj)
                }

                // this.state.chatListener.removeAllListeners(`chat-to-${this.state.userName}`);
            })
        })
    }

    userToClickHandler = (event) => {
        event.preventDefault();

        // const sessionObj = { userName: this.state.userName, userTo: this.state.userTo };
        // console.log("--Click--", sessionObj);

        // this.socket.emit("send message", sessionObj);

        // console.log("--Chat List State--", this.state.chatList);
        // let chatList = this.state.chatList;
        // console.log(chatList);
        // chatList.push(sessionRelayObj.userFrom);

        let chatBoxRenders = this.state.chatBoxRenders;
        chatBoxRenders.splice("SetUser", 1);
        chatBoxRenders.push("LiveChatBox");

        this.setState({ chatBoxRenders, chatList: [...this.state.chatlist, this.state.userFrom] });
    }



    render() {
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
                                returnComponent = <LiveChatBox key={`LiveChatBox-container-${index}`} sessionUser={this.state.userName} sessionUserTo={this.state.userTo} sessionMsg={""} chatListener={this.socket}/>;
                                break;
                            default:
                                //  this.paymentForm = null;
                                returnComponent = null;
                                break;
                        }

                        return returnComponent;
                    })
                }

                { this.state.messageRecievedComponent }
            </Fragment>
        );
    }
}

export default LiveChatContainer;