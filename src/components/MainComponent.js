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
    // login('zigmundsunoo@gmail.com', 'reloader1');
    // logout();
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
    this.getData();
  }
  componentWillUnmount(){
    this.removeListener()
  }
  getData() {
    base.fetch('/', {
      context: this,
      then: (data) => {
        // this.setState({data})
        console.log(data);
      }
    })
  }
  handleSubmit(e){
    e.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    this.setState({email, password})
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
