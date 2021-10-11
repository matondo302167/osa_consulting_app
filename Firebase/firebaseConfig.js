import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage';
var firebaseConfig = {
    apiKey: "AIzaSyA04m4PyY743_tWQhLHqAtnSIY_Z62JeQU",
    authDomain: "firstapp-a8bdd.firebaseapp.com",
    databaseURL: "https://firstapp-a8bdd.firebaseio.com",
    projectId: "firstapp-a8bdd",
    storageBucket: "firstapp-a8bdd.appspot.com",
    messagingSenderId: "380588471990",
    appId: "1:380588471990:web:fbc0f5ca5555ca46eed817",
    measurementId: "G-4MYV0CR6JD"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp (firebaseConfig);
  }
  
  export default firebase; 