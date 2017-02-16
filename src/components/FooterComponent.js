'use strict';

import React from 'react';
import '../styles//Footer.scss';

class FooterComponent extends React.Component {
  render() {
    return (
      <div className="footer-component">
        <p className="text-center">Vapor Decision is a webapp built by Zigmund Sun Oo&copy;</p>
      </div>
    );
  }
}

FooterComponent.displayName = 'FooterComponent';

// Uncomment properties you need
// FooterComponent.propTypes = {};
// FooterComponent.defaultProps = {};

export default FooterComponent;
