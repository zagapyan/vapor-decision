'use strict';

import React from 'react';
import { hashHistory, Link } from 'react-router';
// import { logout } from '../helpers/auth'
import '../styles//Header.scss';

class HeaderComponent extends React.Component {
  constructor(props){
  	super(props);
  }
  onLogout(e){
    e.preventDefault();
    this.props.handleLogout();
  }
  componentWillMount(){
  }
  componentDidMount(){
  }
  render() {
  	const loginTrigger = this.props.authed ? <button onClick={this.onLogout.bind(this)} className="btn btn-danger logout-button">Log Out</button> : '';
    return (
      <div className="header-component">
        <div className="container">
        	<div className="col-xs-2">
        	</div>
        	<div className="col-xs-8">
        		<h1 className="site-header text-center"><Link to="/">Vapor Decision</Link></h1></div>
        	<div className="col-xs-2"><div className="row">{loginTrigger}</div></div>
      	</div>
      </div>
    );
  }
}

HeaderComponent.displayName = 'HeaderComponent';

// Uncomment properties you need
// HeaderComponent.propTypes = {};
// HeaderComponent.defaultProps = {};

export default HeaderComponent;
