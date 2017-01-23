'use strict';

import React from 'react';
import ContentComponent from './ContentComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';

import '../styles/Index.css';

class IndexComponent extends React.Component {
  render() {
    return (
      <div className="index-component">
        <HeaderComponent />
        <ContentComponent props={this.props.children} />
        <FooterComponent />
      </div>
    );
  }
}

IndexComponent.displayName = 'IndexComponent';

// Uncomment properties you need
// IndexComponent.propTypes = {};
// IndexComponent.defaultProps = {};

export default IndexComponent;
