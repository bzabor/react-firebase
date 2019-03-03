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
import API from "../API";

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

    this.idToken = "";

    this.state = {
      idToken: "",
      employee: localStorage.getItem("employee"),
      loadComplete: false,
      error: ""
    };
  }

  onSetResult = (key, result) => {
    localStorage.setItem(key, JSON.stringify(result));
    this.setState({ key: result });
  };

  componentDidMount() {
    console.log("ENTER APP componentDidMount()");
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      console.log("authuser is");
      console.log(authUser);
      if (authUser) {
        this.setState({ loadComplete: false });
        this.props.firebase.auth.currentUser
          .getIdToken(true)
          .then(idToken => {
            if (this.state.employee) {
              this.setState({
                idToken: idToken,
                loadComplete: true
              });
            } else {
              const client = API(idToken);
              client
                .get("/hasAccess")
                .then(response => {
                  if (response) {
                    client
                      .get("/employee")
                      .then(response => {
                        console.log("employee response is");
                        console.log(response);
                        localStorage.setItem(
                          "employee",
                          JSON.stringify(response.data)
                        );
                        this.setState({
                          idToken: idToken,
                          employee: response.data,
                          loadComplete: true
                        });
                      })
                      .catch(error => {
                        console.error(error);
                        this.setState({
                          error:
                            "Error retrieving employee info: " + error.message,
                          loadComplete: false
                        });
                      });
                  } else {
                    this.setState({
                      error: "User does not have access",
                      loadComplete: false
                    });
                  }
                })
                .catch(error => {
                  console.error(error);
                  this.setState({
                    error: "Error determining access: " + error.message,
                    loadComplete: false
                  });
                });
            }
          })
          .catch(error => {
            console.error(error);
            this.setState({
              error: "Error getting idToken: " + error.message,
              loadComplete: false
            });
          });
      } else {
        // this.onSetResult("employee", null);
        localStorage.removeItem("employee");
        this.setState({ employee: null, loadComplete: true });
        console.log("employee set to null");
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    console.log("ENTER APP RENDER. state is:");
    console.log(this.state);

    if (this.state.error) {
      return (
        <MuiThemeProvider theme={theme}>
          <Typography variant="h4" align="center">
            <br />
            <br />
            <br />
            <br />
            {this.state.error}
          </Typography>
        </MuiThemeProvider>
      );
    }

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
    if (this.state.employee) {
      authRoutes = (
        <div>
          <Route
            exact
            path={ROUTES.HOME}
            render={props => (
              <HomePage
                idToken={this.state.idToken}
                employee={this.state.employee}
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
              employee={this.state.employee}
              isAdmin={this.state.employee ? this.state.employee.isAdmin : false}
            />
            {authRoutes}
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default withFirebase(App);
