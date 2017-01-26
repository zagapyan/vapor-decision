'use strict';

import React from 'react';
import '../styles/Main.css';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import { base, ref, firebaseAuth} from '../config/constants';
import {auth, logout, login, saveUser} from '../helpers/auth';

class MainComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authed: false,
      loading: true
    };
  }
  componentDidMount(){
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({
          authed: true,
          loading: false
        })
      } else {
        this.setState({
          loading: false
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
