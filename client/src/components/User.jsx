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
    redirectToHome: false
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
    return (
      <div>
        <Link to="/">
          <button>Back to Users</button>
        </Link>
        <h1>{this.state.user.name}</h1>
        <h3>Total Tasks: {this.state.tasks.length}</h3>
        <button onClick={this.handleToggleEdit}>
          {this.state.editUser ? "Back to User" : "Edit User"}
        </button>
        {this.state.editUser ? (
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  name="name"
                  value={this.state.user.name}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor="image">Image URL: </label>
                <input
                  type="text"
                  name="image"
                  value={this.state.user.image}
                  onChange={this.handleChange}
                />
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
        ) : (
          <Tasks tasks={this.state.tasks} userId={this.state.user._id} />
        )}
        <button onClick={this.handleDeleteUser} style={{ marginTop: "5vh" }}>
          Delete User
        </button>
      </div>
    );
  }
}
