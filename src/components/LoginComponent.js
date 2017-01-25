'use strict';

import React from 'react';

import '../styles/Login.css';

class LoginComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  loginSubmit(event){
    event.preventDefault();
    this.state.email= this.refs.email.value
    this.state.password= this.refs.password.value;
    
    // clear after submitting;
    this.refs.email.value = '';
    this.refs.password.value = '';
  }
  render(){
    return (
      <div className="login-component">
        <div className="container">
          <form className="form-control" name="submitLogin" onSubmit={this.loginSubmit.bind(this)}>
            <h1>{this.props.title}</h1>
            <p>{this.props.stuff}</p>
            <label name="email">Email: </label>
            <input htmlFor="submitLogin" type="email" ref="email"/>
            <label name="password">Password: </label>
            <input htmlFor="submitLogin" type="password" ref="password"/>
            <button
              type="submit"
              htmlFor="submitLogin"
              className="btn btn-lg btn-default">Login
            </button>
          </form>
        </div>
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
