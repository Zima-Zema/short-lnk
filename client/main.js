import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router";
import createBrowserHistory from 'history/createBrowserHistory';
import Signup from "../imports/ui/Signup";
import Link from "../imports/ui/Link";
import NotFound from "../imports/ui/NotFound";
import Login from "../imports/ui/Login";


const customHistory = createBrowserHistory();
window.customHistory = customHistory;
const routes = (
  <Router history={customHistory}>
    <Switch>
      <Route exact path="/" component={Login}/>    
      <Route path="/login" component={Login}/>      
      <Route path="/signup" component={Signup}/>
      <Route path="/links" component={Link}/>
      <Route component={NotFound} />
    </Switch>    
  </Router>
)
Meteor.startup(()=>{
  ReactDOM.render(routes,document.getElementById('app'));
})