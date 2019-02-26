import app from "firebase/app";

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
  }
}

export default Firebase;
