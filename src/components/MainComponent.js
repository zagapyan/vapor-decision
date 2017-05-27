'use strict';

import React from 'react';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import { browserHistory } from 'react-router';
import { base, ref, firebaseAuth, GoogleAuthProvider} from '../config/constants';
import { auth, logout, login, saveUser } from '../helpers/auth';
import _ from 'lodash';
import update from 'react-addons-update';

import '../styles/Main.scss';

const spinnerContainerStyles={textAlign: 'center', width: '100%', float: 'left'};
const LoadingGif = require('../images/loading.gif');

class MainComponent extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      authed: false,
      handleAuthentication: this.handleAuthentication.bind(this),
      checkIfUserExists: this.checkIfUserExists.bind(this),
      getRandomValue: this.getRandomValue.bind(this),
      listItems: this.props.listItems,
      handleLogout: this.handleLogout.bind(this),
      handleGoogleLogin: this.handleGoogleLogin.bind(this),
      handleSubmitItem: this.handleSubmitItem.bind(this),
      handleDeleteItem: this.handleDeleteItem.bind(this),
      handleSpin: this.handleSpin.bind(this),
      syncToFirebase: this.syncToFirebase.bind(this)
    };
    console.log('componentWillMount')
    console.log(this.state)
  }

  checkIfUserExists(options){
    return base.fetch(`${options.uid}`,{context:this})
  }
  checkIfLoggedIn(){
    firebaseAuth().onAuthStateChanged((user)=>{
      if (user) {
        // User is signed in.
        console.log('user: ', user)
        this.setState({authed: true, uid: user.uid})
      } else {
        // No user is signed in.
        console.log('no user')
      }
    })
  }
  componentDidMount(){
    console.log('componentDidMount')
    this.checkIfLoggedIn()
    this.handleAuthentication({...this.state})
    // this.syncToFirebase({...this.state})
  }
  componentWillUnmount(){
    this.removeListener()
  }
  
  // This calculates a random value from the list
  getRandomValue(){
    if(this.state.listItems.length > 1){
      let randomItem = this.state.listItems[Math.floor(Math.random() * this.state.listItems.length)];
      let randomItemKey = randomItem.key;
      this.setState({
        randomItemKey: randomItemKey,
      });
    }
    else if(this.state.listItems.length == 1){
      this.setState({randomValue: <p>You only have one value. Please add more items...</p>})
    }
    else this.setState({randomValue: <p>There are no values. Add items to the list.</p>});
  }

  handleAuthentication(options){
    let uid = options.uid
    this.checkIfUserExists({options})
      .then(data=>{
        if (_.isEmpty(data)){
          this.setState({uid, listItems: [{key: 0, value: 'Hello Friend! Add more to vaporize your decisions', authed: true}]},
              ()=>{
                console.log(this.state)
                this.syncToFirebase({...this.state})
              }
            )
        }
      })
  }
  // This handles logging out
  handleLogout(){
    this.setState({authed: false, uid:''},
      ()=>{
        if(this.state.authed == false){
          browserHistory.push('/login');
          logout();
        }
      });
  }

  // This handles the email login [not google auth]
  handleGoogleLogin(){
    console.log('handleGoogleLogin')
    let provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');

    firebaseAuth().signInWithPopup(provider).then(function(result) {

      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;

      // The signed-in user info.
      let user = result.user
      let uid = user.uid


      this.handleAuthentication({uid})
      // this pushes the state to list
      browserHistory.push('/list')

    }.bind(this)).catch(function(error) {

      // Handle Errors here.
      let errorCode = error.code
      let errorMessage = error.message

      // The email of the user's account used.
      let email = error.email

      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential
    }.bind(this));
  }

  // This handles list submit items
  handleSubmitItem(item){
    let itemValue = _.isEmpty(item.value) ? [] : item.value; 
    console.log(`itemValue ${itemValue} this.state.listItems ${this.state.listItems}`);
    this.setState({listItems: this.state.listItems.concat({value: itemValue})},
      ()=>{
        console.log(this.state);
      }
    );
  }
  
  // This handles list delete items
  handleDeleteItem(key){
    this.setState({
      listItems: update(this.state.listItems, {$splice: [[key, 1]]})
    })
  }
  
  // This handles list spin
  handleSpin(){
    this.getRandomValue();
  }
  
  syncToFirebase(properties, callback){
    console.log(properties.uid);
    base.syncState(`${properties.uid}/listItems`, {context:this, state: 'listItems', asArray: true})
    base.syncState(`${properties.uid}/randomItemKey`, {context:this, state: 'randomItemKey'})
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
        authed: this.state.authed,
        getRandomValue: this.getRandomValue.bind(this),
        handleLogout: this.handleLogout.bind(this),
        handleGoogleLogin: this.handleGoogleLogin.bind(this),
        handleSubmitItem: this.handleSubmitItem.bind(this),
        handleDeleteItem: this.handleDeleteItem.bind(this),
        handleSpin: this.handleSpin.bind(this),
        listItems: this.state.listItems,
        syncToFirebase: this.syncToFirebase.bind(this),
        uid: this.state.uid
     })
    );
    return (
      <div className="main-component">
        <HeaderComponent {...this.state} location={this.props.location}/>
        {childrenWithProps}
        <FooterComponent />
      </div>
    );
  }
}

MainComponent.displayName = 'MainComponent';

// Uncomment properties you need
// MainComponent.propTypes = {};
MainComponent.defaultProps = {
  listItems: []
};

export default MainComponent;
