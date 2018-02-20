import { Meteor } from "meteor/meteor";
import ReactDOM from "react-dom";
import { Tracker } from 'meteor/tracker';
import { onAuthChange, routes } from '../imports/routes/routes'


Tracker.autorun(()=>{
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
  console.log("isAuthenticated",isAuthenticated);

})
Meteor.startup(()=>{
  ReactDOM.render(routes,document.getElementById('app'));
})