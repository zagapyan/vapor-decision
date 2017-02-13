'use strict';

import React from 'react';
import '../styles/Main.scss';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';

class MainComponent extends React.Component {
  render() {
    return (
    	// const children = React.Children.map((child)=>{
    	// 	return React.cloneElement(child, {...this.state});
    	// });
      <div className="main-component">
        <HeaderComponent />
        {this.props.children}
        <FooterComponent />
      </div>
    );
  }
}

MainComponent.displayName = 'MainComponent';

// Uncomment properties you need
// MainComponent.propTypes = {};
// MainComponent.defaultProps = {};

export default MainComponent;
