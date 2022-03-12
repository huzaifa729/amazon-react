// import firebase  from "firebase";

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyD-b-w0vYp7HP38b1LmUw9-6lBZ7BREN9A",
    authDomain: "clone-42385.firebaseapp.com",
    projectId: "clone-42385",
    storageBucket: "clone-42385.appspot.com",
    messagingSenderId: "986575027302",
    appId: "1:986575027302:web:be9f2c767bc4fda9f441a7"
  };



  const firebaseApp = firebase.initializeApp(firebaseConfig);


  const db = firebaseApp.firestore();
  const auth = firebase.auth();


  export { db , auth };