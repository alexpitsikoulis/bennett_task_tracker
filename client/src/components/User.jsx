import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Tasks from "./Tasks";

export default class User extends Component {
  state = {
    user: {},
    tasks: [],
    errors: [],
    editUser: false,
    redirectToHome: false,
    showFinishedTasks: false
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    axios
      .get(`/api/users/${this.props.match.params.userId}`)
      .then(res => {
        axios
          .get(`/api/users/${this.props.match.params.userId}/tasks`)
          .then(res2 => {
            this.setState({
              user: res.data,
              tasks: res2.data
            });
          });
      })
      .catch(err => {
        this.setState({ err: err.data });
      });
  };

  handleToggleEdit = () => {
    this.setState(state => {
      return { editUser: !state.editUser };
    });
  };

  handleToggleShowFinishedTasks = () => {
    this.setState(state => {
      return { showFinishedTasks: !state.showFinishedTasks };
    });
  };

  handleChange = event => {
    const copiedUser = { ...this.state.user };
    copiedUser[event.target.name] = event.target.value;
    this.setState({ user: copiedUser });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios.put(`/api/users/${this.state.user._id}`, this.state.user);
    this.setState({ editUser: false });
  };

  handleDeleteUser = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`/api/users/${this.props.match.params.userId}`).then(() => {
        this.setState({ redirectToHome: true });
      });
    }
  };

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }

    const openTasks = this.state.tasks.filter(task => {
      return task.status !== "Finished";
    });

    const finishedTasks = this.state.tasks.filter(task => {
      return task.status === "Finished";
    });

    return (
      <div>
        <Link to="/">
          <button>Back to Users</button>
        </Link>
        <h1>{this.state.user.name}</h1>
        <button onClick={this.handleToggleEdit}>
          {this.state.editUser ? "Back to User" : "Edit User"}
        </button>
        <br />
        <h3>
          {this.state.showFinishedTasks
            ? `Total Finished Tasks: ${finishedTasks.length}`
            : `Total Open Tasks: ${openTasks.length}`}
        </h3>
        <button onClick={this.handleToggleShowFinishedTasks}>
          {this.state.showFinishedTasks
            ? "Show Open Tasks"
            : "Show Finished Tasks"}
        </button>
        {this.state.editUser ? (
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={this.state.user.name}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email: </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={this.state.user.email}
                  onChange={this.handleChange}
                />
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
        ) : (
          <Tasks
            tasks={this.state.showFinishedTasks ? finishedTasks : openTasks}
            userId={this.state.user._id}
          />
        )}
        <button onClick={this.handleDeleteUser} style={{ marginTop: "5vh" }}>
          Delete User
        </button>
      </div>
    );
  }
}
