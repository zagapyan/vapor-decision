import Rebase from 're-base';

export const base = Rebase.createClass({
  apiKey: 'AIzaSyAhDcrtv3kIOqlZhHQDZUf62bItWqEMnwI',
  authDomain: 'fir-test-447a2.firebaseapp.com',
  databaseURL: 'https://fir-test-447a2.firebaseio.com',
  storageBucket: 'fir-test-447a2.appspot.com',
  messagingSenderId: '934022056810'
});

export const ref = base.database().ref();
export const firebaseAuth = base.auth;
export const GoogleAuthProvider = base.auth.GoogleAuthProvider;