import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const LogInPage = () => (
  <div>
    <h1>Log In</h1>
    <LogInButton />
  </div>
);

const INITIAL_STATE = {
  error: null
};

class LogInButton extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  logIn = event => {
    event.preventDefault();

    this.props.firebase.doLogIn()
      .then(authUser => {
        console.log(authUser);
      })
      .then(() => {
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { error } = this.state;
    return (
        <div>
            <button onClick={this.logIn}>LOG IN</button>
            {error && <p>{error.message}</p>}
        </div>
    )
  }
}

export default LogInPage;
