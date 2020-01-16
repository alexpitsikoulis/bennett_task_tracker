import React, { Component } from "react";
import axios from "axios";
import Tasks from "./Tasks";

export default class User extends Component {
  state = {
    user: {},
    errors: []
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    axios
      .get(`/api/users/${this.props.match.params.userId}`)
      .then(res => {
        this.setState({ user: res.data });
      })
      .catch(err => {
        this.setState({ err: err.data });
      });
  };

  render() {
    return (
      <div>
        <h1>{this.state.user.name}</h1>
        <Tasks userId={this.state.user._id} />
      </div>
    );
  }
}
