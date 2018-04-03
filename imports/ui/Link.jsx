import React, {Component} from "react";
import {Router} from "react-router";
import {Meteor} from "meteor/meteor";
import createBrowserHistory from 'history/createBrowserHistory';

//component
import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

const customHistory = createBrowserHistory({forceRefresh: true});

export default class Link extends Component {
    constructor(props) {
        super(props);
        if (!Meteor.userId()) {
            customHistory.replace('/');
        }
    }
    render() {
        return (
            <div>
                <PrivateHeader title="Short Lnk" />
                <div className="wrapper">
                    <LinksListFilters />
                    <AddLink />
                    <LinksList/>
                </div>
            </div>
        )
    }
}