'use strict';

import React from 'react';
import '../styles//Content.scss';
import { Link } from 'react-router';
class ContentComponent extends React.Component {
  render() {
    return (
      <div className="content-component">
        <div className="container">
        	<h1 className="text-center">Welcome to Vapor Decision!</h1>
        	<p className="text-center">Insert fancy image here for ad</p>
        	<Link to="login" className="btn btn-default login-button">Login</Link>
      	</div>
      </div>
    );
  }
}

ContentComponent.displayName = 'ContentComponent';

// Uncomment properties you need
// ContentComponent.propTypes = {};
// ContentComponent.defaultProps = {};

export default ContentComponent;
