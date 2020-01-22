import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default class Task extends Component {
  state = {
    task: {},
    errors: [],
    editTask: false,
    user: {},
    redirectToUser: false
  };

  componentDidMount() {
    this.getTask();
  }

  getTask = () => {
    axios
      .get(
        `/api/users/${this.props.match.params.userId}/tasks/${this.props.match.params.taskId}`
      )
      .then(res => {
        this.setState({ task: res.data });
        axios.get(`/api/users/${this.state.task.userId}`).then(res2 => {
          this.setState({ user: res2.data });
        });
      })
      .catch(err => {
        this.setState({ errors: err.data });
      });
  };

  handleToggleEdit = () => {
    this.setState(state => {
      return { editTask: !state.editTask };
    });
  };

  handleChange = event => {
    const copiedTask = { ...this.state.task };
    copiedTask[event.target.name] = event.target.value;
    this.setState({ task: copiedTask });
  };

  handleSubmit = event => {
    event.preventDefault();

    const name = this.state.user.name;
    const email = this.state.user.email;
    const message = `Your task ${this.state.task.title} has been updated\n\nDescription: ${this.state.task.description}\n\nThis is a ${this.state.task.priority} priority task`;

    axios
      .post("/send/updatedTask", { name, email, message })
      .then(res => {
        if (res.data.msg !== "success") {
          alert("Email failed to send");
        }
      })
      .then(() => {
        axios.put(
          `/api/users/${this.state.task.userId}/tasks/${this.state.task._id}`,
          this.state.task
        );
        this.setState({ editTask: false });
      });
  };

  handleDelete = () => {
    if (window.confirm("Are you sure you want to remove this task?")) {
      axios
        .delete(
          `/api/users/${this.state.task.userId}/tasks/${this.state.task._id}`
        )
        .then(() => {
          this.setState({ redirectToUser: true });
        });
    }
  };

  getTaskDateTime = () => {
    const taskDT = new Date(this.state.task.dateTimeStarted);
    return taskDT.getHours() > 12
      ? `${taskDT.getMonth() +
          1}/${taskDT.getDate()}/${taskDT.getFullYear()} at ${taskDT.getHours() -
          12}:${taskDT.getMinutes()} PM`
      : `${taskDT.getMonth() +
          1}/${taskDT.getDate()}/${taskDT.getFullYear()} at ${taskDT.getHours()}:${taskDT.getMinutes()} AM`;
  };

  render() {
    if (this.state.redirectToUser) {
      return <Redirect to={`/${this.state.task.userId}`} />;
    }
    return (
      <div>
        <button onClick={this.handleToggleEdit}>
          {this.state.editTask ? "Back to Task" : "Edit Task"}
        </button>
        {this.state.editTask ? (
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                name="title"
                required
                value={this.state.task.title}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="priority">Priority: </label>
              <select
                name="priority"
                id="priority"
                value={this.state.task.priority}
                onChange={this.handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label htmlFor="estimatedHours">
                Estimated Hours To Complete:{" "}
              </label>
              <input
                type="number"
                name="estimatedHours"
                id="estimatedHours"
                value={this.state.task.estimatedHours}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description: </label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                value={this.state.task.description}
                onChange={this.handleChange}
              ></textarea>
            </div>
            <input type="submit" value="Submit" />
          </form>
        ) : (
          <div>
            <h1>{this.state.task.title}</h1>
            <h3>
              User:{" "}
              <Link to={`/${this.state.task.userId}`}>
                {this.state.user.name}
              </Link>
            </h3>
            <h3>Priority: {this.state.task.priority}</h3>
            <h3>
              Estimated Hours To Complete: {this.state.task.estimatedHours}
            </h3>
            <h4>Date and Time Started: {this.getTaskDateTime()}</h4>
            <p>{this.state.task.description}</p>
            <button onClick={this.handleDelete}>Completed</button>
          </div>
        )}
      </div>
    );
  }
}
