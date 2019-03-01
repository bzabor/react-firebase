import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    margin: '0 auto',
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
});

function EmployeeHeader(props) {
  const { classes } = props;

  return (
    <div className={classes.heroUnit}>
      <div className={classes.heroContent}>
        <Typography
          variant="h5"
          color="textPrimary"
        >
          Welcome back, {props.employee.name}!
        </Typography>
        <Typography variant="h6" align="left" color="textSecondary" paragraph>
          Current Coin-Craft Balance: {props.employee.current_balance}
        </Typography>
        <div className={classes.heroButtons}>

        </div>
      </div>
    </div>
  );
}

EmployeeHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmployeeHeader);
