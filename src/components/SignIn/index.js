import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  isLoggedIn: false,
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  logIn = event => {
    event.preventDefault();
    console.log("LOG IN CLICKED");

    // this.setState({ isLoggedIn: true });
    // TODO: call firebase login

    this.props.firebase
      .doLogIn()
      // .then(() => {
      //   cconsole.log("SIGN IN SUCCESS!");
      //   this.setState({ ...INITIAL_STATE });
      //   this.props.history.push(ROUTES.HOME);
      // })
      // .catch(error => {
      //   console.error("ERROR in login");
      //   console.error(error);
      //   this.setState({ error });
      // });

      .then(authUser => {
        console.log("SIGN IN SUCCESS!");
        // Create a user in your Firebase realtime database
        // return this.props.firebase.user(authUser.user.uid).set({
        //   username,
        //   email
        // });
        return true;
      })
      .then(() => {
        console.log("SETTING STATE!");
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  logOut = event => {
    event.preventDefault();
    console.log("LOG OUT CLICKED");
    this.setState({ isLoggedIn: false });
    // TODO: call firebase login
  };

  render() {
    const { isLoggedIn, error } = this.state;

    if (isLoggedIn) {
      return <button onClick={this.logOut}>SIGN OUT</button>;
    } else {
      return <button onClick={this.logIn}>SIGN IN</button>;
    }
    //   {error && <p>{error.message}</p>}
    // </form>
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

// export { SignInForm };
