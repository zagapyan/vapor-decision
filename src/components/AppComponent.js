import React, { Component } from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
import 'normalize.css/normalize.css';
import '../styles/App.scss';

import IndexComponent from './IndexComponent';
import MainComponent from './MainComponent';
import ListComponent from './ListComponent';
import LoginComponent from './LoginComponent';
import NoMatchComponent from './NoMatchComponent';

class App extends Component {
  constructor(props){
    super(props)
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
        {/*<Router history={browserHistory} routes={routes} {...this.state}/>*/}
        <Router history={browserHistory}>
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
