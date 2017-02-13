import React, { Component } from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
import IndexComponent from './IndexComponent';
import MainComponent from './MainComponent';
import ListComponent from './ListComponent';
import LoginComponent from './LoginComponent';
import NoMatchComponent from './NoMatchComponent';

import { base, ref, firebaseAuth} from '../config/constants';
import {auth, logout, login, saveUser} from '../helpers/auth';

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
        // console.log(user);
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
        <Router history={browserHistory} >
          <Route path="/" component={MainComponent}>
            <IndexRoute component={IndexComponent} />
            <Route path="list" component={ListComponent} />
            <Route path="login" component={LoginComponent} />
          </Route>
          <Route path="*" component={NoMatchComponent} />
        </Router>
      </div>
    );
  }
}
App.defaultProps = {
  stuff: 'i are stuffz.'
}
export default App;