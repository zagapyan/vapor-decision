'use strict'

import React from 'react'
import update from 'react-addons-update'

import ListItemsComponent from './ListItemsComponent'
import ListFormComponent from './ListFormComponent'
import RandomItemSpinnerComponent from './RandomItemSpinnerComponent'

const LoadingGif = require('../images/loading.gif')

require('styles//List.scss')

const spinnerContainerStyles={textAlign: 'center', width: '100%', float: 'left'}
const loadingStyle = {width: '10rem', float: 'none', display:'inline-block'}
const spinningComponent = ()=>{
  return(<div style={spinnerContainerStyles}><img src={LoadingGif} className="loading-gif"/><br /><p className="flicker">...Spinning</p></div>)
};

class ListComponent extends React.Component {
  
  constructor(props){
    super(props);
    // console.log(this.props)
    this.state=this.props;
  }
  
  componentWillMount(){}
  componentDidMount(){}
  
  componentWillReceiveProps(nextProps){
    if(nextProps.listItems){
      console.log(nextProps)
      this.setState({listItems: nextProps.listItems, randomValue: nextProps.randomValue})
    }
  }
  render() {
    return (
      <div className="list-component">
        <div className="container">
          <div className="row">
            <RandomItemSpinnerComponent randomValue={this.state.randomValue}/>
            <ListItemsComponent {...this.state} handleDeleteItem={this.state.handleDeleteItem.bind(this)}/>
            <hr className="col-xs-12"/>
            <ListFormComponent  handleSubmitItem={this.state.handleSubmitItem.bind(this)} handleSpin={this.state.handleSpin.bind(this)} freeze={this.state.freeze}/>
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
