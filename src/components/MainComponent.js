'use strict';

import React from 'react';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import { hashHistory } from 'react-router';
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
					hashHistory.push('/login');
					logout();
				}
			});
	}
	handleGoogleLogin(){

		let provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    
    console.log(provider);

		firebaseAuth().signInWithPopup(provider).then(function(result) {
		  // This gives you a Google Access Token. You can use it to access the Google API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
		  console.log(token);
		  console.log(user);
		  this.setState({authed: true}, ()=> hashHistory.push('/list'));
		  // ...
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		});
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
			 handleGoogleLogin: this.handleGoogleLogin
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
