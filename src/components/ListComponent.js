'use strict';

import React from 'react';
import update from 'react-addons-update';

import ListItemsComponent from './ListItemsComponent';
import ListFormComponent from './ListFormComponent';
import RandomItemSpinnerComponent from './RandomItemSpinnerComponent';

import {base} from '../config/constants';

require('styles//List.scss');

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
  handleDeleteItem(key){
    this.setState({
      listItems: update(this.state.listItems, {$splice: [[key, 1]]})
    })
  }
  handleSpin(){
    this.getRandomValue();
  }
  getRandomValue(){
    if(this.state.listItems.length > 1){
      let randomValue = this.state.listItems[Math.floor(Math.random() * this.state.listItems.length)]['value'];
      this.setState({randomValue})   
    }
    else if(this.state.listItems.length == 1){
      this.setState({randomValue: 'You only have one value. Please add more items...'})
    }
    else this.setState({randomValue: 'There are no values. Add items to the list.'});
  }
  componentWillMount(){
    // console.log('componentWillMount');
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
            <RandomItemSpinnerComponent randomValue={this.state.randomValue}/>
            <ListItemsComponent {...this.state} handleDeleteItem={this.handleDeleteItem.bind(this)}/>
            <hr className="col-xs-12"/>
            <ListFormComponent  handleSubmitItem={this.handleSubmitItem.bind(this)} handleSpin={this.handleSpin.bind(this)}/>
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
  randomValue: 'Start Spinning!', 
  listItems: [{}]
};

export default ListComponent;
