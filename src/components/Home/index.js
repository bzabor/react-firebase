import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import EmployeeTable from "./EmployeeTable";
import EmployeeHeader from "./EmployeeHeader";
import API from "../API";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadComplete: false,
      expenses: [],
    };
  }

  componentDidMount() {
      console.log('ENTER Home.componentDidMount(). passed idToken: ' + this.props.idToken);
    this.setState({ loadComplete: false });
    const client = API(this.props.idToken);
    client
      .get("/hasAccess")
      .then(response => {
        if (response) {
          client
            .get("/expenses")
            .then(response => {
              console.log("expenses response is");
              console.log(response);
              this.setState({
                expenses: response.data,
                loadComplete: true
              });
            })
            .catch(error => {
              console.error(error);
              this.setState({
                error:
                  "Error retrieving expenses: " + error.message,
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
        <EmployeeHeader employee={this.props.employee} />
        <EmployeeTable expenses={this.state.expenses} />
      </div>
    );
  }
}

export default Home;
