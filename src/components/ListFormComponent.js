'use strict';

import React from 'react';

require('styles//ListForm.css');

class ListFormComponent extends React.Component {
  constructor(props){
  	super(props);
  }
  onSubmit(e){
    this.listItem = this.refs.listItem.value;
    e.preventDefault();
    console.log(this);
    if(this.listItem.length > 0){
      this.setState({
        listItem: { value: this.listItem }
      },()=>{
        // clear out input field
        this.props.handleSubmit(this.state.listItem);
      });
    }
  }
  render() {
    return (
      <div className="listform-component">
        <div className="col-xs-12">
          <form name="list-form" onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
            	<input type="text" htmlFor="list-form" ref="listItem" className="form-control" placeholder="Add Your Items to the List"/>
            	<button type="submit" htmlFor="list-form" className="btn btn-default">Add to List</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ListFormComponent.displayName = 'ListFormComponent';

// Uncomment properties you need
// ListFormComponent.propTypes = {};
// ListFormComponent.defaultProps = {};

export default ListFormComponent;
