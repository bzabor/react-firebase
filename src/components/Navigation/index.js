import React from "react";
// import { Link } from 'react-router-dom';
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import LogOutLink from "../LogOut";
import LogInLink from "../LogIn";
import * as ROUTES from "../../constants/routes";

const Navigation = ({ authUser, isAdmin }) => {
  return authUser ? (
    <div>
      <NavbarAuth isAdmin={isAdmin} />
    </div>
  ) : (
    <div>
      <NavbarUnAuth />
    </div>
  );
};

const NavbarAuth = ({ isAdmin }) => {
  let adminButton = "";
  console.log('in navbarauth, isAdmin:');
  console.log(isAdmin);

  if (isAdmin) {
    adminButton = (
      <Button href={ROUTES.ADMIN} color="inherit" >
        Admin
      </Button>
    );
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href={ROUTES.HOME} variant="h6" color="inherit" style={{flex: 1}}>
          DL Money
        </Link>

        {adminButton}

        <Button href={ROUTES.ADD_EXPENSE} color="inherit" >
          Add Expense
        </Button>

        <LogOutLink />
      </Toolbar>
    </AppBar>
  );
};

const NavbarUnAuth = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        DL Money
      </Typography>

      <LogInLink />
    </Toolbar>
  </AppBar>
);

export default Navigation;
