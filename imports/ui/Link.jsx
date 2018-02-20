import React, {Component} from "react";
import {Router} from "react-router";
import {Meteor} from "meteor/meteor";
import {Accounts} from 'meteor/accounts-base';
import {Links} from '../api/links'
import createBrowserHistory from 'history/createBrowserHistory';

//component
import LinksList from './LinksList';

const customHistory = createBrowserHistory({forceRefresh: true});

export default class Link extends Component {

    constructor(props) {
        super(props);
        console.log('constructor');
        if (!Meteor.userId()) {
            customHistory.replace('/');

        }
        this.state = {
            error: ''
        }
    }
    logoutHandler() {
        // history({     forceRefresh:true }).push('/');
        Accounts.logout();

    }
    onSubmit(e) {
        e.preventDefault();
        let url = this
            .refs
            .url
            .value
            .trim();
        let userId = Meteor.userId();
        if (url) {
            Meteor.call('links.insert', url, (err, res) => {
                if (err) {
                    this.setState({error: err.reason});
                } else {
                    this.setState({error: ''});
                    this.refs.url.value = '';
                }
            });
        }
    }
    componentWillMount() {
        console.log('componentWillMount');
    }
    render() {
        return (
            <div>
                <h1>Your Links</h1>
                <button
                    onClick={this
                    .logoutHandler
                    .bind(this)}>LogOut</button>
                <LinksList/>
                <h3>Add Link</h3>
                {this.state.error
                    ? <p>{this.state.error}</p>
                    : null}
                <form
                    onSubmit={this
                    .onSubmit
                    .bind(this)}>
                    <input type="text" name="url" ref="url" id="txt_url" placeholder="URL"/>
                    <button>Add Link</button>
                </form>
            </div>
        )
    }
}