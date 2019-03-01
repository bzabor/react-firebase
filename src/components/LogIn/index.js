import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import { withFirebase } from "../Firebase";

class LogInLink extends Component {
  logIn = event => {
    event.preventDefault();
    this.props.firebase
      .doLogIn()
      .then(authUser => {
        console.log("in LOGIN, response:");
        console.log(authUser);
        console.log("exit login");
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <Button
        color="inherit"
        onClick={this.logIn}
        style={{ marginLeft: "auto" }}
      >
        Log In
      </Button>
    );
  }
}

export default withFirebase(LogInLink);
