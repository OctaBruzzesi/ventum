import firebase from 'firebase/app';

const config = {
  apiKey: "AIzaSyCKX749HJrCDvpNvG2kiTFpgt5mDpt4_QY",
  authDomain: "ventum-a3ce4.firebaseapp.com",
  databaseURL: "https://ventum-a3ce4.firebaseio.com",
  projectId: "ventum-a3ce4",
  storageBucket: "ventum-a3ce4.appspot.com",
  messagingSenderId: "664625376954"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};
