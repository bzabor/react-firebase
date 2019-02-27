import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import { withFirebase } from '../Firebase';

class LogOutLink extends Component {

  logOut = event => {
    event.preventDefault();
    this.props.firebase.doLogOut()
      .then(authUser => {
        console.log(authUser);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
        <Typography variant="body1" onClick={this.logOut}>LOG OUT</Typography>
    )
  }
}

export default withFirebase(LogOutLink);
