import React, {Component} from "react";
import {Link} from "react-router-dom";
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from "meteor/meteor";
import createBrowserHistory from 'history/createBrowserHistory';
const customHistory = createBrowserHistory({
  forceRefresh:true
});


export default class Signup extends Component {

  constructor(props) {
    super(props);
    if(Meteor.userId()){
      customHistory.replace('/links');
    }
 
    this.state = {
      error:0
    }
  }
  componentWillMount(){

}
  onSubmit(e){
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    if (password.length < 9) {
      return this.setState({error:'Password must be more than 8 characters long'});
    }
    Accounts.createUser({email,password},(error)=>{
      // console.log('signup Erroe', error);
      if (error) {
          this.setState({
            error:error.reason
          });
      }
      else{
        this.setState({
          error:''
        });
      }
    })


  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join Short Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : null}
          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" id="txt-email" placeholder="Email"/>
            <input type="password" ref="password" name="password" id="txt-password" placeholder="Password"/>
            <button className="button">Create Account</button>
          </form>
          <Link to="/">Already Have Account</Link>
        </div>
      </div>
    )
  }
}
