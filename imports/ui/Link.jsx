import React, { Component } from "react";
import { Router } from "react-router";
import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import createBrowserHistory from 'history/createBrowserHistory';
const customHistory = createBrowserHistory({
    forceRefresh:true
});

export default class Link extends Component{

    constructor(){
        super();
        console.log('constructor');
        if(!Meteor.userId()){
            customHistory.replace('/');
            
          }
    }
    logoutHandler(){
        // history({
        //     forceRefresh:true
        // }).push('/');
        Accounts.logout();

    }
    componentWillMount(){
        console.log('componentWillMount');
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