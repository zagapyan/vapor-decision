'use strict';

import React from 'react';

require('styles//RandomItemSpinner.scss');

class RandomItemSpinnerComponent extends React.Component {
  constructor(props){
  	super(props);
  	console.log(this);
  }
  componentWillMount(){
  	setTimeout(()=>{
  		console.log(this.getRandomItem())}
		, 3000);
  }
  getRandomItem(){
  	// return this.props.listItems[Math.floor(Math.random() * this.props.listItems.length)]['value'];
  }
  render() {
    return (
      <div className="randomitemspinner-component">
      	<div className="jumbotron">
          <div className="container">
            <h2 className="text-center">{this.props.randomValue}</h2>
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
