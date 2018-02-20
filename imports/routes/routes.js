import { Meteor } from "meteor/meteor";
import React from "react";
import { Router, Route, Switch } from "react-router";
import createBrowserHistory from 'history/createBrowserHistory';
import Signup from "../ui/Signup";
import Link from "../ui/Link";
import NotFound from "../ui/NotFound";
import Login from "../ui/Login";


const customHistory = createBrowserHistory();
window.browserHistory = customHistory;
const unauthenticatedPages=['/','/signup','login'];
const authenticatedPages = ['/links'];

export const onAuthChange = (isAuthenticated)=>{
    const pathName = customHistory.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
    const isAuthenticatedPage = authenticatedPages.includes(pathName);
    //if on unauthenticated page and logged in, redirect to /links
      //history.push
    //if on authenticated page and not logged in, redirect to /
      //history.push
    //no else
  
    if (isUnauthenticatedPage && isAuthenticated) {
      customHistory.replace('/links');
    }else if (isAuthenticatedPage && !isAuthenticated) {
      customHistory.replace('/');
    }
};
export const routes = (
  <Router history={customHistory}>
    <Switch>
      <Route exact path="/" component={Login} />    
      <Route path="/login" component={Login} />      
      <Route path="/signup" component={Signup} />
      <Route path="/links" component={Link} />
      <Route component={NotFound} />
    </Switch>    
  </Router>
);
