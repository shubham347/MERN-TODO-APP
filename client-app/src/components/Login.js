import React, { useState } from "react";
import Form from "./Form";
import "../Styles/Login.css";

    function Login(props) {

    const [userIsRegistered, setUserIsRegistered] = useState(true);
    return (
        <div>
        <div className="container"> 
        <span style={ userIsRegistered ? {fontWeight :'bold'} : {}} onClick = {() => {setUserIsRegistered(true)}} >Log In</span>
        <span style={ !userIsRegistered ? {fontWeight :'bold'} : {}} onClick ={ () => {setUserIsRegistered(false)}} >Register</span>
        <hr></hr>
        <p>Please enter below details</p>
        <Form isRegistered={userIsRegistered} />
        </div>
        </div>
    );
    }

export default Login;
