'use strict';

import React from 'react';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import { hashHistory } from 'react-router';
import { base, ref, firebaseAuth} from '../config/constants';
import { auth, logout, login, saveUser } from '../helpers/auth';

import '../styles/Main.scss';

class MainComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			authed: false,
			handleLogout: this.handleLogout.bind(this),

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
	componentWillMount(){
		
	}
	componentWillUnmount(){
		this.removeListener()
	}
	render() {
		const childrenWithProps = React.Children.map(this.props.children,
		 (child) => React.cloneElement(child, {
			 authed: this.state.authed,
			 
		 })
		);
		return (
			<div className="main-component">
				<HeaderComponent {...this.state}/>
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
