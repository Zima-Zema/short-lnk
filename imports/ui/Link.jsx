import React, { Component } from "react";
import { Router } from "react-router";
import history from 'history/createBrowserHistory';

export default class Link extends Component{

    logoutHandler(){
        history({
            forceRefresh:true
        }).push('/');
    }

    render(){
        return (
            <div>
                <h1>Your Links</h1>
                <button onClick={this.logoutHandler.bind(this)}>LogOut</button>
            </div>
        )
    }
}