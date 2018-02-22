import React, {Component} from "react";
import {Link,Redirect} from 'react-router-dom';
import {Meteor} from 'meteor/meteor'
import createBrowserHistory from 'history/createBrowserHistory';
const customHistory = createBrowserHistory({
    forceRefresh:true
});

export default class Login extends Component {

    constructor(props) {
        super(props);
        if(Meteor.userId()){
            console.log("Oppa");
            customHistory.replace('/links');
        
          }
     
        this.state = {
            error: ''
        }


    }

    onSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim(); 
        Meteor.loginWithPassword({email},password , (err) => {
            if (err) {
                console.log("login callback",err);
                this.setState({error:'Unable to login. Check email and password.'});
            }
            else{
                this.setState({error:''});
            }
        });
    }
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Short Lnk</h1>
                    {this.state.error ? <p>{this.state.error}</p> : null}
                    <form onSubmit={this.onSubmit.bind(this)} noValidate>
                        <input
                            type="email"
                            ref="email"
                            name="email"
                            id="txt-email"
                            placeholder="Email"/>
                        <input
                            type="password"
                            ref="password"
                            name="password"
                            id="txt-password"
                            placeholder="Password"/>
                        <button>Login</button>
                    </form>
                    <Link to="/signup">Have An Account</Link>
                </div>
            </div>
        )
    }
}