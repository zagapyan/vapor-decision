'use strict';

import React from 'react';

import {auth, logout, login, saveUser} from '../helpers/auth';
import '../styles/Login.scss';

class LoginComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message: 'Please enter your email and password'
    }
  }
  componentWillMount(){
    console.log(this);
  }
  handleLoginSubmit(e){
    e.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    login(email, password).then((data)=>{
      if(data.isAnonymous===false){
        this.setState({
          message: 'You have been authenticated!'
        }, ()=>{
          setTimeOut(()=>{
            return;
          }, 1000)
        })
      }
    }).catch((err)=>{
      console.log(err);
      this.setState({
        message: err.message
      }, ()=>{

      })
    })
  }
  handleLogout(){
    logout();
  }
  render(){
    return (
      <div className="login-component">
        <div className="container">
          <h1> Login </h1>
          <form onSubmit={this.handleLoginSubmit.bind(this)}>
            <p>{this.state.message}</p>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="Email" ref="email"/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password" ref="password" />
            </div>
            <div className="col-xs-12 button-row">
              <div className="row">
                <button type="submit" className="btn btn-primary login">Log In</button>
                <button onClick={this.handleLogout} className="btn btn-danger logout">Log Out</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

LoginComponent.defaultProps = {
}

LoginComponent.displayName = 'LoginComponent';

// Uncomment properties you need
// LoginComponent.propTypes = {};
// LoginComponent.defaultProps = {};

export default LoginComponent;
