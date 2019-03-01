import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { withFirebase } from "../Firebase";
import Navigation from "../Navigation";
import LandingPage from "../Landing";
import HomePage from "../Home";
import AddExpensePage from "../AddExpense";
import AdminPage from "../Admin";

import * as ROUTES from "../../constants/routes";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000"
    },
    secondary: {
      main: "#00ff00"
    }
  },
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      isAdmin: false,
      loadComplete: false
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState({ loadComplete: false });

        this.props.firebase.auth.currentUser
          .getIdToken(true)
          .then(idToken => {
            authUser.idToken = idToken;
            this.setState({ authUser, loadComplete: true });
          })
          .catch(function(error) {
            console.error("auth state change error:" + error);
          });
      } else {
        this.setState({ authUser: null, loadComplete: true });
        console.log("authUser set to null");
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  updateIsAdmin = isAdmin => {
      console.log('updateIsAdmin called with value:' + isAdmin);
    this.setState({ isAdmin: isAdmin });
  };

  render() {
    if (!this.state.loadComplete) {
      return (
        <MuiThemeProvider theme={theme}>
          <Typography variant="h4" align="center">
            <br />
            <br />
            <br />
            <br />
            Loading..
          </Typography>
        </MuiThemeProvider>
      );
    }

    let authRoutes = <Route path={ROUTES.LANDING} component={LandingPage} />;
    if (this.state.authUser) {
      authRoutes = (
        <div>
          <Route
            exact
            path={ROUTES.HOME}
            render={props => (
              <HomePage
                authUser={this.state.authUser}
                updateIsAdmin={this.updateIsAdmin}
                {...props}
              />
            )}
          />
          <Route exact path={ROUTES.ADD_EXPENSE} component={AddExpensePage} />
          <Route exact path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      );
    }

    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Navigation
              authUser={this.state.authUser}
              isAdmin={this.state.isAdmin}
            />
            {authRoutes}
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default withFirebase(App);
