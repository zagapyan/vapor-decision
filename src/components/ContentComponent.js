'use strict';

import React from 'react';
import '../styles//Content.scss';
import { Link } from 'react-router';
const vaporDecisionLogo = require('../images/vapor-decision-logo.png');
class ContentComponent extends React.Component {
  render() {
    return (
      <div className="content-component">
        <div className="container">
          <h1 title="Vapor Decision"><img src={vaporDecisionLogo} className="floating vapor-decision-logo" alt="Vapor Decision"/></h1>
          <p className="subhead text-center">So a machine can make bad choices for you...</p>
          <p className="text-center">...redundant titles are also bad choices.</p>
        	<Link to="login" className="btn btn-default login-button">Login</Link>
          {/* <Link to="list" className="btn btn-default login-anon">Skip Login</Link> */}
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
