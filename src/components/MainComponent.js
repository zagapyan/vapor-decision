'use strict';

import React from 'react';
import '../styles/Main.scss';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';

import { base, ref, firebaseAuth} from '../config/constants';
import { auth, logout, login, saveUser } from '../helpers/auth';


class MainComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			authed: false
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
	componentWillMount(){
		// this.getData();
	}
	componentWillUnmount(){
		this.removeListener()
	}
	render() {
		const childrenWithProps = React.Children.map(this.props.children,
		 (child) => React.cloneElement(child, {
			 authed: this.state.authed
		 })
		);
		return (
			<div className="main-component">
				<HeaderComponent />
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
