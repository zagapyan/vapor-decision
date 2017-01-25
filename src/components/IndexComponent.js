'use strict';

import React from 'react';
import ContentComponent from './ContentComponent';

import '../styles/Index.css';

class IndexComponent extends React.Component {
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
