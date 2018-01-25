import React, { Component } from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import 'uikit/dist/css/uikit.min.css'
import 'uikit/dist/css/uikit-rtl.min.css'
import Routes from './components/Routes'
import './App.css'

export const history =  createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;
