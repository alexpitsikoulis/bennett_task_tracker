import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class UploadFile extends Component {
  state = {
    title: "",
    file: "",
    task: {},
    errors: {},
    redirectToTask: false
  };

  componentDidMount() {
    this.getTask();
  }

  getTask = () => {
    axios
      .get(`/api/tasks/${this.props.match.params.taskId}`)
      .then(res => {
        this.setState({ task: res.data });
      })
      .catch(err => {
        this.setState({ errors: err.data });
      });
  };

  handleChangeTitle = event => {
    this.setState({ title: event.target.value });
  };

  handleChangeFile = event => {
    this.setState({ file: event.target.files[0] });
  };

  handleSubmit = event => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("file", this.state.file);
    formData.append("taskId", this.state.task._id);

    axios
      .post("/api/files/add", formData)
      .then(() => {
        const subject = `A New File Has Been Added To One of Your Tasks`;
        const email = this.state.task.userEmail;
        const message = `${this.state.task.assignedBy} has added a new file to your task ${this.state.task.title}`;

        axios.post("/send", { subject, email, message }).then(res => {
          if (res.data.msg !== "success") {
            alert("Email failed to send");
          }
        });

        this.setState(state => {
          return {
            title: "",
            file: {},
            task: state.task,
            errors: state.errors,
            redirectToTask: window.confirm(
              "Would you like to add another file?"
            )
              ? false
              : true
          };
        });
      })
      .catch(err => {
        this.setState({ errors: err.data });
      });
  };

  render() {
    if (this.state.redirectToTask) {
      return (
        <Redirect
          to={`/${this.state.task.userId}/tasks/${this.state.task._id}`}
        />
      );
    }
    return (
      <div>
        <h1>Upload Files for {this.state.task.title}</h1>
        <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">File Title: </label>
            <input
              type="text"
              name="title"
              id="title"
              value={this.state.title}
              onChange={this.handleChangeTitle}
            />
          </div>
          <div>
            <label htmlFor="file">Choose a File: </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={this.handleChangeFile}
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
