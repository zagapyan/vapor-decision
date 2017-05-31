'use strict'

import React from 'react'
import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'
import { hashHistory } from 'react-router'
import { base, ref, firebaseAuth, GoogleAuthProvider} from '../config/constants'
import { auth, logout, login, saveUser } from '../helpers/auth'
import _ from 'lodash'
import update from 'react-addons-update'

import '../styles/Main.scss'

const LoadingGif = require('../images/loading.gif')

const spinnerContainerStyles={textAlign: 'center', width: '100%', float: 'left'}
const loadingStyle = {width: '10rem', float: 'none', display:'inline-block'}
const spinningComponent = ()=>{
  return(<div style={spinnerContainerStyles}><img src={LoadingGif} className="loading-gif"/><br /><p className="flicker">...Spinning</p></div>)
};


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
    console.log('checkIfUserExists: ', options)
    if(options.uid){
      return base.fetch(`${options.uid}`,{context:this})
    }
  }
  checkIfLoggedIn(){
    console.log('checkIfLoggedIn')
    firebaseAuth().onAuthStateChanged((user)=>{
      if (user) {
        // User is signed in.
        console.log('user: ', user)
        this.setState({authed: true, uid: user.uid}, ()=>{
          this.handleAuthentication({...this.state})
        })
        
      } else {
        // No user is signed in.
        hashHistory.push('/login')
        return 0
      }
    })
  }
  componentDidMount(){
    console.log('componentDidMount')
    this.checkIfLoggedIn(this.handleAuthentication)
  }
  componentWillUnmount(){
    this.removeListener()
  }
  
  // This calculates a random value from the list
  getRandomValue(){
    this.setState({randomValue: spinningComponent()}, ()=>{
      if(this.state.listItems.length > 1){
        let time = 1500
        let randomItem = this.state.listItems[Math.floor(Math.random() * this.state.listItems.length)]
        let randomItemKey = randomItem.key
        let randomValue = this.state.listItems[randomItemKey]['value']
        
        setTimeout(()=>{
          this.setState({randomValue: <p>{randomValue}</p>})
        }, time)
      }
      else if(this.state.listItems.length == 1){
        this.setState({randomValue: <p>You only have one value. Please add more items...</p>})
      }
      else this.setState({randomValue: <p>There are no values. Add items to the list.</p>})
    })
  }

  handleAuthentication(options){
    console.log('handleAuthentication')
    let uid = options.uid;
    this.checkIfUserExists({...options})
      .then(data=>{
        if (_.isEmpty(data)){
          console.log('user does not exist. creating new list')
          this.setState({uid, listItems: [{key: 0, value: 'Hello Friend! Add more to vaporize your decisions', authed: true}]},
              ()=>{
                console.log(this.state)
                this.syncToFirebase({...this.state})
              }
            )
        }
        else{
          console.log('user exists!')
          base.fetch(`${uid}`, {context: this}).then(data=>{
            this.setState({...data}, this.syncToFirebase({...this.state}))
          })
        }
      })
  }
  // This handles logging out
  handleLogout(){
    this.setState({authed: false, uid:''},
      ()=>{
        if(this.state.authed == false){
          hashHistory.push('/login')
          logout()
        }
      })
  }

  // This handles the email login [not google auth]
  handleGoogleLogin(){
    console.log('handleGoogleLogin')
    let provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/plus.login')

    firebaseAuth().signInWithPopup(provider).then(function(result) {

      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken

      // The signed-in user info.
      let user = result.user
      let uid = user.uid

      console.log(uid)
      this.handleAuthentication({uid})
      // this pushes the state to list
      hashHistory.push('/list')

    }.bind(this)).catch(function(error) {

      // Handle Errors here.
      let errorCode = error.code
      let errorMessage = error.message

      // The email of the user's account used.
      let email = error.email

      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential
    }.bind(this))
  }

  // This handles list submit items
  handleSubmitItem(item){
    let itemValue = _.isEmpty(item.value) ? [] : item.value;
    console.log(`itemValue ${itemValue} this.state.listItems ${this.state.listItems}`)
    this.setState({listItems: this.state.listItems.concat({value: itemValue})},
      ()=>{
        console.log(this.state)
      }
    )
  }
  
  // This handles list delete items
  handleDeleteItem(key){
    this.setState({
      listItems: update(this.state.listItems, {$splice: [[key, 1]]})
    })
  }
  
  // This handles list spin
  handleSpin(){
    this.getRandomValue()
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
        randomValue: this.state.randomValue,
        uid: this.state.uid
     })
    )
    
    return (
      <div className="main-component">
        <HeaderComponent {...this.state} location={this.props.location}/>
        {childrenWithProps}
        <FooterComponent />
      </div>
    )
  }
}

MainComponent.displayName = 'MainComponent'

// Uncomment properties you need
// MainComponent.propTypes = {};
MainComponent.defaultProps = {
  listItems: []
}

export default MainComponent
