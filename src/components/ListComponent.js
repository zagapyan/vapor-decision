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

class ListComponent extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props)
    this.state=this.props;
  }
  getData() {
    base.fetch(`${this.state.uid}/listItems`, {
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
      let randomItem = this.state.listItems[Math.floor(Math.random() * this.state.listItems.length)];
      let randomItemKey = randomItem.key;
      this.setState({
        randomItemKey: randomItemKey,
      });
    }
    else if(this.state.listItems.length == 1){
      this.setState({randomValue: <p>You only have one value. Please add more items...</p>})
    }
    else this.setState({randomValue: <p>There are no values. Add items to the list.</p>});
  }
  componentWillMount(){
    console.log(this.props)
    if(this.state.authed){
      console.log('authed and mounted')
      this.getData();
    }
    else{
      this.setState({listItems:[]});
    }
  }
  componentDidMount(){}
  syncToFirebase(nextProps){
    this.setState({...nextProps})
    let uid = nextProps.uid
    base.syncState(`${uid}/listItems`, {
      context: this,
      state: 'listItems',
      asArray: true
    })
    base.syncState(`${uid}/status/randomItemKey`,{
      context: this,
      state: 'randomItemKey',
      asArray: false
    });
    base.listenTo(`${uid}/status/randomItemKey`, {
      context: this,
      then: ()=>{
        this.setState({
            freeze: true,
            randomValue: <div style={spinnerContainerStyles}><img src={LoadingGif} className="loading-gif"/><br /><p className="flicker">...Spinning</p></div>
          }, ()=>{
          setTimeout(()=>{
              let randomItemKey = this.state.randomItemKey;
              let randomItemKeyValue = this.state.listItems[randomItemKey]['value'];
              this.setState({
                freeze: false,
                randomValue: <span style={spinnerContainerStyles}><h2 className="spin-result">{randomItemKeyValue}</h2></span>,
              });
            }, 2000
          );
        })
      }
    });
  }
  componentWillReceiveProps(nextProps){
    this.syncToFirebase(nextProps)
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
  // listItems: [{}],
  freeze: false
};

export default ListComponent;
