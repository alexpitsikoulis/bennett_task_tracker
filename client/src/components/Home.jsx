import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Home extends Component {
  state = {
    users: [],
    errors: []
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios
      .get("/api/users")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        this.setState({ errors: err.data });
      });
  };

  render() {
    const userList = this.state.users.map(user => {
      return (
        <div>
          <h2>
            <Link to={`/${user._id}`}>{user.name}</Link>
          </h2>
        </div>
      );
    });
    return (
      <div>
        <h1>All Users</h1>
        {userList}
      </div>
    );
  }
}
