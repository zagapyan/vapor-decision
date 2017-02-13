'use strict';

import React from 'react';
import '../styles//Content.scss';

class ContentComponent extends React.Component {
  render() {
    return (
      <div className="content-component">
        <p>This is the Content Component</p>
      </div>
    );
  }
}

ContentComponent.displayName = 'ContentComponent';

// Uncomment properties you need
// ContentComponent.propTypes = {};
// ContentComponent.defaultProps = {};

export default ContentComponent;
