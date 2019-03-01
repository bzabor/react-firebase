import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import EmployeeTable from "./EmployeeTable";
import EmployeeHeader from "./EmployeeHeader";
import API from "../API";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadComplete: false,
      employee: {},
      expenses: [],
    };
  }

  componentDidMount() {
    this.setState({ loadComplete: false });
    const client = API(this.props.authUser.idToken);
    client
      .get("/hasAccess")
      .then(response => {
        axios
          .all([client.get("/expenses"), client.get("/employee")])
          .then(
            axios.spread((expenses, employee) => {
              // Both requests are now complete
              this.setState({
                expenses: expenses.data,
                employee: employee.data,
                loadComplete: true
              });
              this.props.updateIsAdmin(this.state.employee.isAdmin);
            })
          )
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  }

  render() {
    if (!this.state.loadComplete) {
      return (
        <Typography variant="h4" align="center">
          <br />
          <br />
          <br />
          <br />
          Loading..
        </Typography>
      );
    }

    return (
      <div className="page">
        <EmployeeHeader employee={this.state.employee} />
        <EmployeeTable expenses={this.state.expenses} />
      </div>
    );
  }
}

export default Home;
