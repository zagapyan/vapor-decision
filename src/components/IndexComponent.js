'use strict';

import React from 'react';
import {Router, hashHistory}from 'react-router';
import ContentComponent from './ContentComponent';

import '../styles/Index.scss';

class IndexComponent extends React.Component {
	constructor(props){
		super(props);
	}
	componentWillMount(){
		// console.log(this.props);
		if(this.props.authed==true){
			hashHistory.push('/list');
			console.log(Router);
		}
	}
	componentDidMount(){
	}
  render() {
    return (
      <div className="index-component">
        <ContentComponent props={this.props.children} />
      </div>
    );
  }
}

IndexComponent.displayName = 'IndexComponent';

// Uncomment properties you need
// IndexComponent.propTypes = {};
// IndexComponent.defaultProps = {};

export default IndexComponent;
