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
      checkIfUserExists: this.checkIfUserExists.bind(this),
      getData: this.getData.bind(this),
      getRandomValue: this.getRandomValue.bind(this),
      listItems: this.props.listItems,
      handleLogout: this.handleLogout.bind(this),
      handleGoogleLogin: this.handleGoogleLogin.bind(this),
      handleSubmitItem: this.handleSubmitItem.bind(this),
      handleDeleteItem: this.handleDeleteItem.bind(this),
      handleSpin: this.handleSpin.bind(this),
      syncToFirebase: this.syncToFirebase.bind(this)
    };
  }
  
  checkIfUserExists(uid){
    console.log('this is the user id:',uid);

    base.fetch(`${uid}`, {context:this})
      .then(data=>{
        console.log(data)
        // if listItems does not exist [because user has not been created]
        if(_.isEmpty(data)){
          console.log('no data exists')
          this.syncToFirebase(uid,
            this.setState({
              listItems: [{value: 'Welcome! Add more to your list!'}],
              randomItemKey: '',
              status: false
            })
          )
          
        }
        else browserHistory.push('/list')
      })
      .catch(err=>err)
  }

  componentDidMount(){
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid
        this.setState({
          authed: true,
          uid
        }, ()=>this.checkIfUserExists(uid))
      }
    })
  }
  
  componentWillMount(){
    // if uid exists, sync it to state
    if(this.state.uid){
      this.syncToFirebase(this.state.uid)
    }
  }
  componentWillUnmount(){
    this.removeListener()
  }

  // Handles getting List Data
  getData() {
    console.log('getting data')
    base.fetch(`${this.state.uid}/listItems`, {
      context: this,
    }).then((data)=>{
      let listItems = _.isEmpty(data) ? [] : data;
      this.setState({listItems})
    })
      .catch(err=>err)
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
      console.log(user);
      let uid = user.uid
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
  
  syncToFirebase(nextProps, callback){
    this.setState({...nextProps})
    let uid = nextProps.uid
    base.syncState(`${uid}/listItems`, {
      context: this,
      state: 'listItems',
      asArray: true
    })
    base.syncState(`${uid}/status/randomItemKey`,{
      context: this,
      state: 'randomItemKey',
      asArray: false
    });
    base.listenTo(`${uid}/status/randomItemKey`, {
      context: this,
      then: ()=>{
        this.setState({
            freeze: true,
            randomValue: <div style={spinnerContainerStyles}><img src={LoadingGif} className="loading-gif"/><br /><p className="flicker">...Spinning</p></div>
          }, ()=>{
          setTimeout(()=>{
              let randomItemKey = this.state.randomItemKey ? this.state.randomItemKey : '';
              let randomItemKeyValue = this.state.listItems[randomItemKey] ? this.state.listItems[randomItemKey]['value'] : '';
              this.setState({
                freeze: false,
                randomValue: <span style={spinnerContainerStyles}><h2 className="spin-result">{randomItemKeyValue}</h2></span>,
              });
            }, 2000
          );
        })
      }
    });
    if(callback) callback();
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
        authed: this.state.authed,
        getData: this.getData.bind(this),
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
