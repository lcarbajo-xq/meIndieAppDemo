import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'

const config = {
    apiKey: "AIzaSyDiFBbKlRpNrVFeZev302Z3ly934JTlvMo",
    authDomain: "meindieapp.firebaseapp.com",
    databaseURL: "http://meindieapp.firebaseio.com",
    projectId: "meindieapp",
    storageBucket: "",
    messagingSenderId: "763749738089"
};

firebase.initializeApp(config);

export const firebaseAuth = firebase.auth();

export const firebaseDB = firebase.database();

export default firebase;