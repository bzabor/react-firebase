import app from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDmLiFSI_4mH80n0eo7kU1MH7sgfJE8cco",
  authDomain: "coin-craft.firebaseapp.com",
  databaseURL: "https://coin-craft.firebaseio.com",
  projectId: "coin-craft",
  storageBucket: "coin-craft.appspot.com",
  messagingSenderId: "962776974156"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  // *** Auth API ***
  doLogOut = () => this.auth.signOut();

  doLogIn = () => {
    console.log("ENTER firebase.js doLogIn()");
    const provider = new this.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
    // .then(auth => {
    //   console.log("SIGN IN SUCCESS!");
    //   return true;
    // })
    // .catch(error => {
    //   console.error(error);
    //   return false;
    // });
  };
}

export default Firebase;
