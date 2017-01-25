'use strict';

import React from 'react';
import ListItemsComponent from './ListItemsComponent';
import ListFormComponent from './ListFormComponent';
import update from 'immutability-helper';

require('styles//List.css');

class ListComponent extends React.Component {
  constructor(props){
    super(props);
    this.state=this.props;
  }
  handleSubmit(item){
    console.log(item);
    this.setState({listItems: this.state.listItems.concat(item)});
  }
  handleDelete(id){
    console.log(id);
  }
  render() {
    return (
      <div className="list-component">
        <div className="container">
          <div className="row">
            <ListItemsComponent {...this.state} handleDelete={this.handleDelete.bind(this)} />
            <ListFormComponent  handleSubmit={this.handleSubmit.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

ListComponent.displayName = 'ListComponent';

// Uncomment properties you need
// ListComponent.propTypes = {};
ListComponent.defaultProps = {
  listItems: [
    {
      value: 'Add Your Items Here...'
    }
  ]
};

export default ListComponent;
