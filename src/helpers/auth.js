import { ref, firebaseAuth } from '../config/constants';

export const auth = (email, pw)=>{
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
    .catch((error) => console.log('Oops', error));
}

export const logout = (callback)=>{
  firebaseAuth().signOut();
  if(callback) callback();
}

export const login = (email, pw)=>{
  return firebaseAuth().signInWithEmailAndPassword(email, pw);
}

export const saveUser = (user)=>{
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user);
}