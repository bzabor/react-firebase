import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withFirebase } from '../Firebase';
import Navigation from "../Navigation";
import LandingPage from "../Landing";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";

import * as ROUTES from "../../constants/routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
         authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      });
  }

  componentWillUnmount() {
      this.listener();
  }

  render() {
       let authRoutes = <Route path={ROUTES.LANDING} component={LandingPage} />;
       if (this.state.authUser) {
            authRoutes =
                <div>
                    <Route exact path={ROUTES.HOME} component={HomePage}  />
                    <Route exact path={ROUTES.ACCOUNT} component={AccountPage}  />
                    <Route exact path={ROUTES.ADMIN} component={AdminPage}  />
                </div>;
       }

    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser} />

          <hr/>

          {authRoutes}

        </div>
      </Router>
    );
  }
}

export default withFirebase(App);
