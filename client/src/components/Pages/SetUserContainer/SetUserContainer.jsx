import React, { Fragment, Component } from "react";

function SetUserContainer(props) {
    // userNameTypeHandler={this.userNameTypeHandler} userToTypeHandler={this.userToTypeHandler} clickHandler={this.clickHandler}

    return (
        <div>
            {/* <input type="text" placeholder="Enter Username"
                onChange={(event) => { props.userNameTypeHandler(event) }}
            /> */}
            <input type="text" placeholder="Send to:"
                onChange={(event) => { props.userToTypeHandler(event) }}
            />
            <button
                onClick={(event) => { props.clickHandler(event) }}
            >Submit user to send to</button>
        </div>
    );
}

export default SetUserContainer;