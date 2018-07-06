import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCFiY6mQ-e_XJb1CLJqWbeaU7QEn4miU8g",
    authDomain: "irvinecode-shared.firebaseapp.com",
    databaseURL: "https://irvinecode-shared.firebaseio.com",
    projectId: "irvinecode-shared",
    storageBucket: "irvinecode-shared.appspot.com",
    messagingSenderId: "413648148099"
  };
firebase.initializeApp(config);

const firestore = firebase.firestore();

firestore.settings({
    timestampsInSnapshots: true
});

export { firebase, firestore };