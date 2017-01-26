import React, { Component } from 'react';
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router'
import IndexComponent from './IndexComponent';
import MainComponent from './MainComponent';
import 'normalize.css/normalize.css';
import '../styles/App.scss';

class App extends Component {
  constructor(){
    super();
  }
  render() {
    console.log(this);
    return (
      <div className="app-component">
        <Router history={browserHistory}>
          <Route path="/" component={MainComponent}>
            <IndexRoute component={IndexComponent} />
            {/*<Route path="list" component={ListComponent} />*/}
            {/*<Route path="login" component={LoginComponent} />*/}
          </Route>
          {/*<Route path="*" component={NoMatchComponent} />*/}
        </Router>
      </div>
    );
  }
}
App.defaultProps = {
  stuff: 'i are stuffz.'
}
export default App;