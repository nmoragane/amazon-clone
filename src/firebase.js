import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA6YSchYGc1wmizhvbM0ocEVxqTw1p9SQ",
  authDomain: "clone-838ef.firebaseapp.com",
  projectId: "clone-838ef",
  storageBucket: "clone-838ef.appspot.com",
  messagingSenderId: "357955411052",
  appId: "1:357955411052:web:c25fbfa30b406e7b3acc49",
  measurementId: "G-1DBYWQ9VFF"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };