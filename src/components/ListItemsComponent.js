'use strict';

import React from 'react';

require('styles//ListItems.css');

class ListItemsComponent extends React.Component {
  constructor(props){
  	super(props);
    // console.log(this);
  }
  handleDelete(){
  	// console.log('handleDelete');
  }
  render() {
  	// console.log(this.props.listItems);
    return (
      <div className="listitems-component">
      	<div className="col-xs-12">
    			<ul className="list-unstyled">
            {this.props.listItems.map((item, key)=>{
              return(
                <li key={key} className="form-control">{item.value}
                  <span className="pull-right">
                    <button onClick={this.handleDelete.bind(this)}>&times;</button></span>
                </li>
              );
            })}</ul>
    		</div>
      </div>
    );
  }
}

ListItemsComponent.displayName = 'ListItemsComponent';

// Uncomment properties you need
// ListItemsComponent.propTypes = {};
// ListItemsComponent.defaultProps = {};

export default ListItemsComponent;
