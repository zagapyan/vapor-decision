'use strict';

import React from 'react';
import ListItemsComponent from './ListItemsComponent';
import ListFormComponent from './ListFormComponent';
import {base} from '../config/constants';
require('styles//List.css');

class ListComponent extends React.Component {
  constructor(props){
    super(props);
    this.state=this.props;
    console.log(this);
}
  getData() {
    base.fetch('/listItems', {
      context: this,
      then: (data) => {
        this.setState({listItems: data})
      }
    })
  }
  handleSubmitItem(item){
    // console.log(item);
    this.setState({listItems: this.state.listItems.concat(item)},
      ()=>{
        console.log(this.state);
      }
    );
  }
  handleDeleteItem(id){
    // console.log(id);
  }
  componentWillMount(){
    console.log('componentWillMount');
    this.getData();
  }
  componentDidMount(){
    base.syncState('listItems', {
      context: this,
      state: 'listItems',
      asArray: true
    });
  }
  render() {
    return (
      <div className="list-component">
        <div className="container">
          <div className="row">
            <ListItemsComponent {...this.state} handleDeleteItem={this.handleDeleteItem.bind(this)} />
            <ListFormComponent  handleSubmitItem={this.handleSubmitItem.bind(this)}/>
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
