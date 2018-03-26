import React from "react";

function Message(props){
    return(
        <li>
            {props.currentMessage}
        </li>
    );
}

export default Message;