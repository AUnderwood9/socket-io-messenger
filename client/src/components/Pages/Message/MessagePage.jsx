import React, { Component } from "react";
import socketIOClient from 'socket.io-client';
import MessagePiece from "../../Pieces/Message";

class MessagePage extends Component {
    constructor(props) {
        super(props);
    }
    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         message: "",
    //         sessionMessages: []
    //     }

    //     this.socket = socketIOClient();

    // }

    // componentDidMount(){
    //     let sessionMessages = this.state.sessionMessages;
    //     this.socket.on("relay message", (newMessage) => {
    //         console.log("--relay--", newMessage);
    //         sessionMessages.push(newMessage);
    //         this.setState({ sessionMessages });
    //     });
    // }

    // typeHandler = (event) => {
    //     let message = event.target.value
    //     console.log("--typed--", message);
    //     this.setState({message});
    //     console.log("--state--", this.state.message);
    // }

    // clickHandler = (event) => {
    //     event.preventDefault();
    //     // console.log(event.val);
    //     console.log("--Click--", this.state.message);

    //     this.socket.emit("chat message", this.state.message);
    // }

    // render() {
    //     // console.log("--Current Session messages--", this.state.sessionMessages);
    //     return (
    //         <div>
    //             <ul id="messages">
    //             Stuff
    //                 {/* <MessagePiece /> */}
    //                 {
    //                     this.state.sessionMessages.map((item, index) => {
    //                         return <MessagePiece key={`message-piece-${index}`} currentMessage={item}/>
    //                     })
    //                 }
    //             </ul>
    //             <form action="">
    //                 <input id="input" autoComplete="off" onChange={(event) => {this.typeHandler(event)}} /><button onClick={(event) => {this.clickHandler(event)}}>Send</button>
    //             </form>
    //         </div>
    //     )
    // }

    render() {
        return (
            <div>
                <ul id="messages">
                    Stuff
                            {/* <MessagePiece /> */}
                    {
                        this.props.messageContent.map((item, index) => {
                            return <MessagePiece key={`message-piece-${index}`} currentMessage={item} />
                        })
                    }
                </ul>
                <form action="">
                    <input id="input" autoComplete="off" onChange={(event) => { this.props.typeHandler(event) }} /><button onClick={(event) => { this.props.clickHandler(event) }}>Send</button>
                </form>
            </div>
        );
    }
}

export default MessagePage;