import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Tasks from "./Tasks";

class TasksAssigned extends Component {
  state = {
    tasks: [],
    errors: {},
    showFinishedTasks: false
  };

  componentDidMount() {
    this.getTasks();
  }

  getTasks = loggedInId => {
    axios
      .get(`/api/tasks/assignedBy/${this.props.auth.user.id}`)
      .then(res => {
        this.setState({ tasks: res.data });
      })
      .catch(err => {
        this.setState({ errors: err.data });
      });
  };

  handleToggleOpenOrClosed = () => {
    this.setState(state => {
      return { showFinishedTasks: !state.showFinishedTasks };
    });
  };

  render() {
    const finishedTasks = this.state.tasks.filter(task => {
      return task.status === "Finished";
    });

    const openTasks = this.state.tasks.filter(task => {
      return task.status !== "Finished";
    });
    return (
      <div>
        <h1>Tasks I Have Assigned</h1>
        <button onClick={this.handleToggleOpenOrClosed}>
          {this.state.showFinishedTasks
            ? "Show Open Tasks"
            : "Show Finished Tasks"}
        </button>
        <Tasks
          tasks={this.state.showFinishedTasks ? finishedTasks : openTasks}
          assignedBy={true}
          openOrFinished={this.state.showFinishedTasks ? "Finished" : "Open"}
        />
      </div>
    );
  }
}

TasksAssigned.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(TasksAssigned);
