import React, {Component} from 'react';
import {Meteor} from "meteor/meteor";

export default class AddLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        }
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
    render() {
        return (
            <div>
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