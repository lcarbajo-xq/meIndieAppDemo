import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import '@firebase/storage'

const config = {
    apiKey: "AIzaSyDiFBbKlRpNrVFeZev302Z3ly934JTlvMo",
    authDomain: "meindieapp.firebaseapp.com",
    databaseURL: "http://meindieapp.firebaseio.com",
    projectId: "meindieapp",
    storageBucket: "gs://meindieapp.appspot.com",
    messagingSenderId: "763749738089"
};

firebase.initializeApp(config);

export const firebaseAuth = firebase.auth();

export const firebaseDB = firebase.database();

export const firebaseStorage = firebase.storage();

export default firebase;