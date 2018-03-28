import React, { Component, Fragment } from "react";

function LoginPage(props) {

    return (
        <Fragment>
            <input type="text" placeholder="Enter Username"
                onChange={(event) => { props.userNameTypeHandler(event) }}
            />
            <button
                onClick={(event) => { props.clickHandler(event) }}
            >Submit username</button>
        </Fragment>
    );


}

export default LoginPage;