import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Login extends Component{
    render(){
        return (
            <div>
                <h1>Login To short lnk</h1>
                <p>Login From here</p>
                <Link to="/signup" >Have An Account</Link>
            </div>
        )
    }
}