'use strict';

import React from 'react';
import '../styles/Main.css';
import Rebase from 're-base';

import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';

const base = Rebase.createClass({
  // Initialize Firebase
  apiKey: "AIzaSyAhDcrtv3kIOqlZhHQDZUf62bItWqEMnwI",
  authDomain: "fir-test-447a2.firebaseapp.com",
  databaseURL: "https://fir-test-447a2.firebaseio.com",
  storageBucket: "fir-test-447a2.appspot.com",
  messagingSenderId: "934022056810"
});

const ref = base.database().ref();
const firebaseAuth = base.auth;

class MainComponent extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.getData();
  }
  getData() {
    base.fetch(`/`, {
      context: this,
      then: (data) => {
        // this.setState({data})
        console.log(data);
      }
    })
  }
  render() {
    return (
      <div className="main-component">
        <HeaderComponent />
        {this.props.children}
        <FooterComponent />
      </div>
    );
  }
}

MainComponent.displayName = 'MainComponent';

// Uncomment properties you need
// MainComponent.propTypes = {};
// MainComponent.defaultProps = {};

export default MainComponent;
