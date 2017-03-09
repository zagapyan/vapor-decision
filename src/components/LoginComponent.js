'use strict';

import React from 'react';
import {auth, login, saveUser} from '../helpers/auth';
import {hashHistory} from 'react-router';
import '../styles/Login.scss';

class LoginComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message: 'Please enter your email and password',
      alertClass: this.props.alertClass
    }
  }
  componentWillMount(){
    if(this.props.authed==true){
      hashHistory.push('/list');
    }
  }
  componentWillUnmount(){
    this.removeListener();
  }
  handleLoginSubmit( email, password){
    event.preventDefault();
    login(email, password).then((data)=>{
      if(data.isAnonymous===false){
        this.setState({
          message: 'You have been authenticated!',
          alertClass: 'alert alert-success'
        }, ()=>{
          setTimeout(()=>hashHistory.push('/list'), 1000);
        })
      }
    }).catch((err)=>{
      console.log(err);
      this.setState({
        message: err.message,
        alertClass: 'alert alert-warning'
      }, ()=>{
        return 0;
      })
    })
  }
  onSubmit(event){
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    this.handleLoginSubmit(email, password);
  }
  render(){
    return (
      <div className="login-component">
        <div className="container">
          <h1> Login </h1>
          <form onSubmit={this.onSubmit.bind(this)}>
            <p className={this.state.alertClass}>{this.state.message}</p>
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
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

LoginComponent.defaultProps = {
  alertClass: ''
}

LoginComponent.displayName = 'LoginComponent';

// Uncomment properties you need
// LoginComponent.propTypes = {};
// LoginComponent.defaultProps = {};

export default LoginComponent;
