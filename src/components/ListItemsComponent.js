'use strict';

import React from 'react';

require('styles//ListItems.scss');

class ListItemsComponent extends React.Component {
  constructor(props){
  	super(props);
  }    
  onDelete(key, event){
  	this.props.handleDeleteItem(key);
  }
  render() {
    return (
      <div className="listitems-component">
      	<div className="col-xs-12">
    			<ul className="list-unstyled">
            {this.props.listItems.map((item, key)=>{
              return(
                <li key={key} className="form-control">
                  {item.value}
                  <button onClick={this.onDelete.bind(this, key)} disabled={this.props.freeze}>&times;</button>
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
