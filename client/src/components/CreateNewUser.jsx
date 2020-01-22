import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class CreateNewUser extends Component {
  state = {
    newUser: {
      name: "",
      email: ""
    },
    redirectToUsers: false
  };

  handleChange = event => {
    const copiedNewUser = { ...this.state.newUser };
    copiedNewUser[event.target.name] = event.target.value;
    this.setState({ newUser: copiedNewUser });
  };

  handleSubmit = event => {
    event.preventDefault();

    const name = this.state.newUser.name;
    const email = this.state.newUser.email;
    const message = `Hi ${name}! You have been added to the Bennett Task Tracker app. Click the link below to check it out!\nhttp://bennett-task-tracker.herokuapp.com/`;

    axios
      .post("/send/welcome", { name, email, message })
      .then(res => {
        if (res.data.msg !== "success") {
          alert("Email failed to send");
        }
      })
      .then(() => {
        axios.post("/api/users", this.state.newUser).then(() => {
          this.setState({ redirectToUsers: true });
        });
      });
  };

  render() {
    if (this.state.redirectToUsers) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              required
              value={this.state.newUser.name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              required
              value={this.state.newUser.email}
              onChange={this.handleChange}
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
