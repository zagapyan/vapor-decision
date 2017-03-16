'use strict';

import React from 'react';

require('styles//RandomItemSpinner.scss');

class RandomItemSpinnerComponent extends React.Component {
  constructor(props){
  	super(props);
  	console.log(this);
  }
  componentWillMount(){
  }
  render() {
    return (
      <div className="randomitemspinner-component">
      	<div className="jumbotron">
          <div className="container">
            <div className="col-xs-12">{this.props.randomValue}</div>
          </div>
        </div>
      </div>
    );
  }
}

RandomItemSpinnerComponent.displayName = 'RandomItemSpinnerComponent';

// Uncomment properties you need
// RandomItemSpinnerComponent.propTypes = {};
// RandomItemSpinnerComponent.defaultProps = {};

export default RandomItemSpinnerComponent;
