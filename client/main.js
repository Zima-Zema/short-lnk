import { Meteor } from "meteor/meteor";
import ReactDOM from "react-dom";
import { Tracker } from 'meteor/tracker';
import { onAuthChange, routes } from '../imports/routes/routes'
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-config';
import { Session } from 'meteor/session';

Tracker.autorun(()=>{
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
  console.log("isAuthenticated",isAuthenticated);
});

Meteor.startup(()=>{
  Session.set("showVisible",true);
  ReactDOM.render(routes,document.getElementById('app'));
});