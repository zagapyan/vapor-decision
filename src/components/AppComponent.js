import React, { Component } from 'react';
import { IndexRoute, Router, Route, hashHistory } from 'react-router'

// import { base, ref, firebaseAuth} from '../config/constants';
// import {auth, logout, login, saveUser} from '../helpers/auth';
// import routes from '../helpers/routes'
import 'normalize.css/normalize.css';
import '../styles/App.scss';

// import {auth, logout, login, saveUser} from '../helpers/auth';

import IndexComponent from './IndexComponent';
import MainComponent from './MainComponent';
import ListComponent from './ListComponent';
import LoginComponent from './LoginComponent';
import NoMatchComponent from './NoMatchComponent';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      authed: false
    };
  }
  componentDidMount(){
  }
  componentWillMount(){
  }
  componentWillUnmount(){
  }
  render() {
    return (
      <div className="app-component">
        {/*<Router history={hashHistory} routes={routes} {...this.state}/>*/}
        <Router history={hashHistory}>
          <Route path="/" component={MainComponent}>
            <IndexRoute component={IndexComponent}/>
            <Route path="list" component={ListComponent} />
            <Route path="login" component={LoginComponent} />
          </Route>
          <Route path="*" component={NoMatchComponent}/> 
        </Router>
      </div>
    );
  }
}
App.defaultProps = {
  stuff: 'i are stuffz.'
}
export default App;