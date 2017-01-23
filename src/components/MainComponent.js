'use strict';

import React from 'react';
import '../styles/Main.css';

class MainComponent extends React.Component {
  render() {
    return (
      <div className="main-component">
        {this.props.children}
      </div>
    );
  }
}

MainComponent.displayName = 'MainComponent';

// Uncomment properties you need
// MainComponent.propTypes = {};
// MainComponent.defaultProps = {};

export default MainComponent;
