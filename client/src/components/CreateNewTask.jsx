import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactFilestack from "filestack-react";
import filestackApiKey from "../filestackApiKey";

class CreateNewTask extends Component {
  state = {
    newTask: {
      title: "",
      priority: "Low",
      estimatedHours: 0,
      description: "",
      dueDate: ""
    },
    file: {},
    user: {},
    redirectToUser: false
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    axios.get(`/api/users/${this.props.match.params.userId}`).then(res => {
      this.setState({ user: res.data });
    });
  };

  handleChange = event => {
    const copiedNewTask = { ...this.state.newTask };
    copiedNewTask[event.target.name] = event.target.value;
    this.setState({ newTask: copiedNewTask });
  };

  handleFilestack = filestackRes => {
    if (filestackRes.filesUploaded.length) {
      const file = filestackRes.filesUploaded[0];
      const fileObject = {
        title: file.filename,
        file: file.url,
        fileId: file.uploadId
      };
      this.setState({ file: fileObject });
    } else {
      alert("File failed to upload");
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const dueDate =
      document.querySelector("#dueDate").value === ""
        ? new Date(Date.now())
        : new Date(`${this.state.newTask.dueDate}T17:00:00`);
    const newTaskObject = {
      title: this.state.newTask.title,
      priority: this.state.newTask.priority,
      estimatedHours: this.state.newTask.estimatedHours,
      description: this.state.newTask.description,
      userId: this.props.match.params.userId,
      userEmail: this.state.user.email,
      dueDate: dueDate,
      assignedBy: this.props.auth.user.name,
      assignedById: this.props.auth.user.id
    };
    axios
      .post(`/api/users/${this.props.match.params.userId}/tasks`, newTaskObject)
      .then(newTaskRes => {
        const subject = `You Have Been Assigned a New Task`;
        const email = this.state.user.email;
        const message = `${newTaskObject.assignedBy} assigned you the task ${newTaskObject.title}\n\nDescription: ${newTaskObject.description}\n\nThis is a ${newTaskObject.priority} priority task!`;

        axios.post("/send", { subject, email, message }).then(res => {
          if (res.data.msg !== "success") {
            alert("Email failed to send");
          }
        });

        if (this.state.file.title) {
          const fileObject = {
            title: this.state.file.title,
            file: this.state.file.file,
            fileId: this.state.file.fileId,
            taskId: newTaskRes.data._id
          };
          axios.post("/api/files", fileObject).then(() => {
            console.log("file upload successful !");
          });
        }
      })
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
              required
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
            <label htmlFor="dueDate">Due Date: </label>
            <input
              type="date"
              name="dueDate"
              id="dueDate"
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
          <div>
            <label htmlFor="file">Add a File For This Task: </label>
            <ReactFilestack
              apikey={filestackApiKey}
              onSuccess={res => this.handleFilestack(res)}
            />
            {this.state.file.title
              ? `file uploaded: ${this.state.file.title}`
              : null}
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

CreateNewTask.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(CreateNewTask);
