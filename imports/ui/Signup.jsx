import React, {Component} from "react";
import {Link} from "react-router-dom";
export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error:0
    }
  }
  onSubmit(e){
    e.preventDefault();
    this.setState({
      error:"somthing went wrong."
    })
  }
  render() {
    return (
      <div>
        <h1>Create Account</h1>
        {this.state.error ? <p>{this.state.error}</p> : null}
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="email" name="email" id="txt-email" placeholder="Email"/>
          <input type="password" name="password" id="txt-password" placeholder="Password"/>
          <button>Create Account</button>
        </form>
        <Link to="/">Already Have Account</Link>
      </div>
    )
  }
}
