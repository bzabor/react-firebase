import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import CustomTableCell from "../CustomTableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 400
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

function EmployeeTable(props) {
  const { classes, expenses } = props;

  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Expense Type</CustomTableCell>
              <CustomTableCell align="left">Approved By</CustomTableCell>
              <CustomTableCell align="left">Paid To</CustomTableCell>
              <CustomTableCell align="left">Receipt Total</CustomTableCell>
              <CustomTableCell align="left">Total Miles</CustomTableCell>
              <CustomTableCell align="left">Client</CustomTableCell>
              <CustomTableCell align="left">Description</CustomTableCell>
              <CustomTableCell align="left">Receipt</CustomTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {expenses.map(n => (
              <TableRow className={classes.row} key={n.expense_id}>
                <CustomTableCell component="th" scope="row">{n.reimbursement_source}</CustomTableCell>
                <CustomTableCell align="left">{n.approved_by}</CustomTableCell>
                <CustomTableCell align="left">{n.expense_business_name}</CustomTableCell>
                <CustomTableCell align="left">{n.expense_amount_string}</CustomTableCell>
                <CustomTableCell align="left">{n.miles_amount}</CustomTableCell>
                <CustomTableCell align="left">{n.client_name}</CustomTableCell>
                <CustomTableCell align="left">{n.expense_description}</CustomTableCell>
                <CustomTableCell align="left">{n.receipt_url.substring(0, 15)}</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

EmployeeTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmployeeTable);
