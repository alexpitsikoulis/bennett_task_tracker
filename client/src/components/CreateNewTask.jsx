import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default class CreateNewTask extends Component {
  state = {
    newTask: {
      title: "",
      priority: "Low",
      estimatedHours: 0,
      description: ""
    },
    redirectToUser: false
  };

  handleChange = event => {
    const copiedNewTask = { ...this.state.newTask };
    copiedNewTask[event.target.name] = event.target.value;
    this.setState({ newTask: copiedNewTask });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newTaskObject = {
      title: this.state.newTask.title,
      priority: this.state.newTask.priority,
      estimatedHours: this.state.newTask.estimatedHours,
      description: this.state.newTask.description,
      userId: this.props.match.params.userId
    };
    axios
      .post(`/api/users/${this.props.match.params.userId}/tasks`, newTaskObject)
      .then(() => {
        this.setState({ redirectToUser: true });
      });
  };

  render() {
    if (this.state.redirectToUser) {
      return <Redirect to={`/${this.props.match.params.userId}`} />;
    }
    return (
      <div>
        <Link to={`/${this.props.match.params.userId}`}>
          <button>Back to User</button>
        </Link>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              value={this.state.newTask.title}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="priority">Priority: </label>
            <select
              name="priority"
              value={this.state.newTask.priority}
              onChange={this.handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="estimatedHours">
              Estimated Hours to Complete:{" "}
            </label>
            <input
              type="number"
              name="estimatedHours"
              value={this.state.newTask.estimatedHours}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <textarea
              name="description"
              cols="30"
              rows="10"
              value={this.state.newTask.description}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
