'use strict';

import React from 'react';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import { browserHistory } from 'react-router';
import { base, ref, firebaseAuth, GoogleAuthProvider} from '../config/constants';
import { auth, logout, login, saveUser } from '../helpers/auth';

import '../styles/Main.scss';

class MainComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authed: false,
      handleLogout: this.handleLogout.bind(this),
      handleGoogleLogin: this.handleGoogleLogin.bind(this)
    };
  }
  componentDidMount(){
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {      
      if (user) {
        console.log('user is logged in');
        this.setState({
          authed: true
        })
      } else {
        console.log('user is not logged in');
        this.setState({
          authed: false
        })
      }
    })
  }
  handleLogout(){
    this.setState({authed: false},
      ()=>{
        if(this.state.authed == false){
          browserHistory.push('/login');
          logout();
        }
      });
  }
  handleGoogleLogin(){
    let provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebaseAuth().signInWithPopup(provider).then(function(result) {
      
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      
      // The signed-in user info.
      let user = result.user;
      console.log(this);
      this.setState({authed: true},()=>browserHistory.push('/list'));

    }.bind(this)).catch(function(error) {
      
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      
      // The email of the user's account used.
      let email = error.email;
      
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
    }.bind(this));
  }
  saveUser(user){
    console.log('happen to you');
  }
  componentWillMount(){
  }
  componentWillUnmount(){
    this.removeListener()
  }
  render() {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       authed: this.state.authed,
       handleGoogleLogin: this.handleGoogleLogin.bind(this)
     })
    );
    return (
      <div className="main-component">
        <HeaderComponent {...this.state} location={this.props.location}/>
        {childrenWithProps}
        <FooterComponent />
      </div>
    );
  }
}

MainComponent.displayName = 'MainComponent';

// Uncomment properties you need
// MainComponent.propTypes = {};
// MainComponent.defaultProps = {};

export default MainComponent;
