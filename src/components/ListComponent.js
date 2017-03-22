'use strict';

import React from 'react';
import update from 'react-addons-update';

import ListItemsComponent from './ListItemsComponent';
import ListFormComponent from './ListFormComponent';
import RandomItemSpinnerComponent from './RandomItemSpinnerComponent';
import {base} from '../config/constants';

const LoadingGif = require('../images/loading.gif');

require('styles//List.scss');

const spinnerContainerStyles={textAlign: 'center', width: '100%', float: 'left'};
const loadingStyle = {width: '10rem', float: 'none', display:'inline-block'};
const spinningComponent = ()=>{
  return(<div style={spinnerContainerStyles}><img src={LoadingGif} className="loading-gif"/><br /><p className="flicker">...Spinning</p></div>);
};

console.log(spinningComponent);
class ListComponent extends React.Component {
  constructor(props){
    super(props);
    this.state=this.props;
  }
  getData() {
    base.fetch('/listItems', {
      context: this,
      then: (data) => {
        this.setState({listItems: data})
      }
    });
  }
  handleSubmitItem(item){
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
      this.setState({
        // randomValue: spinningComponent(),
        freeze: true,
        thinking: true,
        display: 'spinner'
      });
      
      setTimeout(()=>{
        let randomItem = this.state.listItems[Math.floor(Math.random() * this.state.listItems.length)];
        let randomItemKey = randomItem.key;
        let randomValue = randomItem.value;
        
        this.setState({
          // randomValue: <span style={spinnerContainerStyles}><h2 className="spin-result">{randomValue}</h2></span>,
          freeze:false,
          thinking: false,
          randomItemKey: randomItemKey,
          display: 'item'
        });  
      }, 2500);
    }
    else if(this.state.listItems.length == 1){
      this.setState({randomValue: <p>You only have one value. Please add more items...</p>})
    }
    else this.setState({randomValue: <p>There are no values. Add items to the list.</p>});
  }
  componentWillMount(){
    if(this.state.authed){
      console.log('authed and mounted')
      this.getData();
    }
    else{
      this.setState({listItems:[]});
    }
  }
  componentDidMount(){
    base.syncState('listItems', {
      context: this,
      state: 'listItems',
      asArray: true
    });
    base.syncState('/status/freeze',{
      context: this,
      state: 'freeze',
      asArray: false,
    });
    base.syncState('/status/thinking',{
      context: this,
      state: 'thinking',
      asArray: false
    });
    base.syncState('/status/randomItemKey',{
      context: this,
      state: 'randomItemKey',
      asArray: false
    });
    base.syncState('/status/display',{
      context: this,
      state: 'display',
      asArray: false
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
            <ListFormComponent  handleSubmitItem={this.handleSubmitItem.bind(this)} handleSpin={this.handleSpin.bind(this)} freeze={this.state.freeze}/>
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
  randomValue: <span style={spinnerContainerStyles}><h3>Start Spinning!</h3></span>, 
  listItems: [{}],
};

export default ListComponent;
