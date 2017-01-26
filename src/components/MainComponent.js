'use strict';

import React from 'react';
import '../styles/Main.css';
import Rebase from 're-base';
import { Match, BrowserRouter, Link, Miss, Redirect } from 'react-router';
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
const auth = (email, pw)=>{
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
    .catch((error) => console.log('Oops', error))
}
const logout = ()=>{
  return firebaseAuth().signOut()
}
const login = (email, pw)=>{
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}
const saveUser = (user)=>{
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}

// const MatchWhenAuthed = ({component: Component, authed, ...rest})=>{
//   return (
//     <Match
//       {...rest}
//       render={(props) => authed === true
//         ? <Component {...props} />
//         : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
//     />
//   )
// }

// const MatchWhenUnauthed = ({component: Component, authed, ...rest})=>{
//   return (
//     <Match
//       {...rest}
//       render={(props) => authed === false
//         ? <Component {...props} />
//         : <Redirect to='/dashboard' />}
//     />
//   )
// }



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
