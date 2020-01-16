import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Tasks extends Component {
  state = {
    tasks: [],
    errors: []
  };

  componentDidMount() {
    this.getTasks();
  }

  getTasks = () => {
    axios
      .get(`/api/users/${this.props.userId}/tasks/`)
      .then(res => {
        this.setState({ tasks: res.data });
      })
      .catch(err => {
        this.setState({ errors: err.data });
      });
  };

  render() {
    const taskList = this.state.tasks.map(task => {
      return (
        <div>
          <Link to={`/tasks/${task._id}`}>
            <h3>{task.title}</h3>
            <h4>Priority: {task.priority}</h4>
            <h4>Est. Hours To Complete: {task.estimatedHours}</h4>
            <p>{task.description}</p>
          </Link>
        </div>
      );
    });
    return (
      <div>
        <h2>Tasks</h2>
      </div>
    );
  }
}
