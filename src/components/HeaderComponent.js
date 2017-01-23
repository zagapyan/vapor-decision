'use strict';

import React from 'react';

import '../styles//Header.css';

class HeaderComponent extends React.Component {
  render() {
    return (
      <div className="header-component">
        <div className="container">
        	<p>This is the Header Component</p>
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
