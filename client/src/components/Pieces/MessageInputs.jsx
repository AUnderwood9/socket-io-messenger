import React from "React";

function MessageInputs(props){
    return(
        <form action="">
            {/* <input placeholder="user" onChange={(event) => {props.userTypeHandler(event)}} /> */}
            <input placeholder="comment" id="input" autoComplete="off" onChange={(event) => { props.commentTypeHandler(event) }} />
            <button onClick={(event) => { props.clickHandler(event) }}>Send</button>
        </form>
    );
}

export default MessageInputs;