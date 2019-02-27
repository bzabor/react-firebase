import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';

import { withFirebase } from "../Firebase";

class LogInLink extends Component {
  logIn = event => {
    event.preventDefault();
    this.props.firebase.doLogIn()
      .then(authUser => {
        console.log(authUser);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
        <Typography variant="body1" onClick={this.logIn}>LOG IN</Typography>
    )
  }
}

export default withFirebase(LogInLink);
