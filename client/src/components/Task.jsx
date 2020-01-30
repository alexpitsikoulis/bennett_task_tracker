import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Task extends Component {
  state = {
    task: {},
    files: [],
    userAssignedBy: {},
    errors: {},
    editTask: false,
    user: {},
    redirectToUser: false,
    dueDateChanged: false,
    initialStatus: "",
    redirectToTaskAssigned: false
  };

  componentDidMount() {
    this.getTask();
    this.getFiles();
  }

  componentWillReceiveProps(nextProps) {}

  getTask = () => {
    axios
      .get(
        `/api/users/${this.props.match.params.userId}/tasks/${this.props.match.params.taskId}`
      )
      .then(res => {
        this.setState({ task: res.data, initialStatus: res.data.status });
        axios
          .get(`/api/users/${res.data.assignedById}`)
          .then(res => {
            this.setState({ userAssignedBy: res.data });
          })
          .catch(err => {
            this.setState({ errors: err.data });
          });
        axios.get(`/api/users/${this.state.task.userId}`).then(res2 => {
          this.setState({ user: res2.data });
        });
      })
      .catch(err => {
        this.setState({ errors: err.data });
      });
  };

  getFiles = () => {
    axios
      .get(`/api/files/${this.props.match.params.taskId}`)
      .then(res => {
        this.setState({ files: res.data });
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
    if (event.target.name === "dueDate") {
      copiedTask.dueDate = new Date(`${event.target.value}T17:00:00`);
      this.setState({ task: copiedTask, dueDateChanged: true });
    } else {
      copiedTask[event.target.name] = event.target.value;
      this.setState({ task: copiedTask });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.task.status === "Finished") {
      if (
        window.confirm(
          "Are you sure you want to mark this task as finished? This will remove it from your active tasks."
        )
      ) {
        const dueDate = new Date(`${this.getDueDate(true)}T17:00:00`);
        const newTaskObject = {
          _id: this.state.task._id,
          title: this.state.task.title,
          priority: this.state.task.priority,
          estimatedHours: this.state.task.estimatedHours,
          description: this.state.task.description,
          userId: this.props.match.params.userId,
          email: this.state.task.userEmail,
          status: this.state.task.status,
          dueDate: dueDate,
          assignedBy: this.state.task.assignedBy,
          assignedById: this.state.task.assignedById
        };

        const subject = `A Task You Assigned Has Been Completed`;
        const email = this.state.userAssignedBy.email;
        const message = `${this.state.user.name} has completed the task ${this.state.task.title}.`;

        axios
          .post("/send", { subject, email, message })
          .then(res => {
            if (res.data.msg !== "success") {
              alert("Email failed to send");
            }
          })
          .then(() => {
            axios.put(
              `/api/users/${this.state.task.userId}/tasks/${this.state.task._id}`,
              newTaskObject
            );
          });

        this.setState({ editTask: false, dueDateChanged: false });
      }
    } else {
      const subject = `One Of Your Tasks Has Been Updated`;
      const email = this.state.user.email;
      const message = `Your task ${this.state.task.title} has been updated\n\nDescription: ${this.state.task.description}\n\nThis is a ${this.state.task.priority} priority task`;

      axios
        .post("/send", { subject, email, message })
        .then(res => {
          if (res.data.msg !== "success") {
            alert("Email failed to send");
          }
        })
        .then(() => {
          const dueDate = new Date(`${this.getDueDate(true)}T17:00:00`);
          const newTaskObject = {
            _id: this.state.task._id,
            title: this.state.task.title,
            priority: this.state.task.priority,
            estimatedHours: this.state.task.estimatedHours,
            description: this.state.task.description,
            userId: this.props.match.params.userId,
            status: this.state.task.status,
            dueDate: dueDate
          };
          axios.put(
            `/api/users/${this.state.task.userId}/tasks/${this.state.task._id}`,
            newTaskObject
          );
          this.setState({ editTask: false, dueDateChanged: false });
        });
    }
  };

  handleReopenTask = () => {
    if (window.confirm("Are you sure you want to reopen this task?")) {
      const copiedTask = { ...this.state.task };
      copiedTask.status = "Started";
      this.setState({ task: copiedTask });

      const subject = `A Task Has Been Reopened`;
      const email = this.state.user.email;
      const message = `Your task ${this.state.task.title} has been reopened.`;

      axios
        .post("/send", { subject, email, message })
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
        })
        .then(() => {
          this.setState({ redirectToTaskAssigned: true });
        });
    }
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

  handleDeleteFile = event => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      axios
        .delete(`/api/files/${event.target.id}`)
        .then(() => {
          this.getFiles();
        })
        .catch(err => {
          this.setState({ errors: err.data });
        });
    }
  };

  getTaskDateTimeStarted = () => {
    const taskDT = new Date(this.state.task.dateTimeStarted);
    return taskDT.getHours() > 12
      ? `${taskDT.getMonth() +
          1}/${taskDT.getDate()}/${taskDT.getFullYear()} at ${taskDT.getHours() -
          12}:${taskDT.getMinutes()} PM`
      : `${taskDT.getMonth() +
          1}/${taskDT.getDate()}/${taskDT.getFullYear()} at ${taskDT.getHours()}:${taskDT.getMinutes()} AM`;
  };

  getDueDate = forForm => {
    const dueDate = new Date(this.state.task.dueDate);
    const month =
      dueDate.getMonth() + 1 < 10
        ? `0${dueDate.getMonth() + 1}`
        : dueDate.getMonth() + 1;
    const date =
      dueDate.getDate() < 10 ? `0${dueDate.getDate()}` : dueDate.getDate();
    return forForm
      ? `${dueDate.getFullYear()}-${month}-${date}`
      : `${dueDate.getMonth() +
          1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
  };

  render() {
    if (this.state.redirectToUser) {
      return <Redirect to={`/${this.state.task.userId}`} />;
    }
    if (this.state.redirectToTaskAssigned) {
      return <Redirect to="/tasksAssigned" />;
    }

    const fileList = this.state.files.map(file => {
      return (
        <li>
          <a download={file.title} href={file.image} target="_blank">
            {file.title}
          </a>
          {this.props.auth.user.id === this.state.task.assignedById ||
          this.props.auth.user.id === this.state.task.userId ? (
            <button id={file._id} onClick={this.handleDeleteFile}>
              X
            </button>
          ) : null}
        </li>
      );
    });

    return (
      <div>
        {this.state.initialStatus !== "Finished" &&
        (this.props.auth.user.id === this.state.task.userId ||
          this.props.auth.user.id === this.state.task.assignedById) ? (
          <button onClick={this.handleToggleEdit}>
            {this.state.editTask ? "Back to Task" : "Edit Task"}
          </button>
        ) : null}
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
              <label htmlFor="dueDate">Due Date: </label>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                value={this.getDueDate(true)}
                onChange={this.handleChange}
              />
              <div>
                <label htmlFor="status">Status: </label>
                <select
                  name="status"
                  id="status"
                  value={this.state.task.status}
                  onChange={this.handleChange}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="Started">Started</option>
                  <option value="Finished">Finished</option>
                </select>
              </div>
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
            <h4>Date and Time Started: {this.getTaskDateTimeStarted()}</h4>
            <h4>Due Date: {this.getDueDate(false)}</h4>
            <h4>Status: {this.state.task.status}</h4>
            <p>{this.state.task.description}</p>
            {this.state.files.length ? (
              <div className="file-list">
                <strong>Files Associated With This Task:</strong>
                <br />
                {fileList}
              </div>
            ) : null}
            <Link to={`/${this.state.task._id}/uploadFiles`}>
              Add Files For This Task
            </Link>
            <br />
            {(this.props.auth.user.id === this.state.task.userId ||
              this.props.auth.user.id === this.state.task.assignedById) &&
            this.state.task.status === "Finished" ? (
              <div>
                <button onClick={this.handleReopenTask}>Reopen Task</button>
              </div>
            ) : null}
            {this.props.auth.user.id === this.state.task.userId ||
            this.props.auth.user.id === this.state.task.assignedById ? (
              <button onClick={this.handleDelete}>Delete Task</button>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

Task.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Task);
