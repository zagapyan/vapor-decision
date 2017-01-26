'use strict';

import React from 'react';

import {auth, logout, login, saveUser} from '../helpers/auth';
import '../styles/Login.css';

class LoginComponent extends React.Component{
  constructor(props){
    super(props);
    console.log(this);
  }
  handleLoginSubmit(e){
    e.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
  }
  handleLogout(){
    logout();
  }
  render(){
    return (
      <div className="container">
        <h1> Login </h1>
        <form onSubmit={this.handleLoginSubmit.bind(this)}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Email" ref="email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref="password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          <button onClick={this.handleLogout} className="btn btn-danger">Log Out</button>
        </form>
      </div>
    )
  }
}

LoginComponent.defaultProps = {
  title: 'This is the login compoent',
  stuff: 'All Login Related Stuff Goes Here'
}

LoginComponent.displayName = 'LoginComponent';

// Uncomment properties you need
// LoginComponent.propTypes = {};
// LoginComponent.defaultProps = {};

export default LoginComponent;
