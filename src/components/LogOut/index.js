import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import { withFirebase } from "../Firebase";

class LogOutLink extends Component {
  logOut = event => {
    event.preventDefault();
    this.props.firebase
      .doLogOut()
      .then(authUser => {
        console.log(authUser);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <Button color="inherit" onClick={this.logOut}>
        Log Out
      </Button>
    );
  }
}

export default withFirebase(LogOutLink);
