import React, { Component } from 'react';
import { IndexRoute, Router, Route, hashHistory } from 'react-router'

import { base, ref, firebaseAuth} from '../config/constants';
import {auth, logout, login, saveUser} from '../helpers/auth';
import routes from '../helpers/routes'
import 'normalize.css/normalize.css';
import '../styles/App.scss';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      authed: false
    };
  }
  componentDidMount(){
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {      
      if (user) {
        console.log('user is logged in');
        this.setState({
          authed: true
        })
      } else {
        console.log('user is not logged in');
        this.setState({
          authed: false
        })
      }
    })
  }
  componentWillMount(){
    // this.getData();
  }
  componentWillUnmount(){
    this.removeListener()
  }
  render() {
    return (
      <div className="app-component">
        <Router history={hashHistory} routes={routes} {...this.state}/>
      </div>
    );
  }
}
App.defaultProps = {
  stuff: 'i are stuffz.'
}
export default App;