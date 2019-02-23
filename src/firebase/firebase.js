import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCKX749HJrCDvpNvG2kiTFpgt5mDpt4_QY",
  authDomain: "ventum-a3ce4.firebaseapp.com",
  databaseURL: "https://ventum-a3ce4.firebaseio.com",
  projectId: "ventum-a3ce4",
  storageBucket: "ventum-a3ce4.appspot.com",
  messagingSenderId: "664625376954"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  
  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

app.initializeApp(config);

const firebaseAuth = app.auth();

export { app, firebaseAuth };

export default Firebase;
