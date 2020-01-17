import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Tasks extends Component {
  render() {
    const taskList = this.props.tasks.map(task => {
      let priorityColor = "";
      switch (task.priority) {
        case "Low":
          priorityColor = "rgba(0, 255, 0, 0.8)";
          break;
        case "Medium":
          priorityColor = "rgba(255, 255, 0, 0.8)";
          break;
        case "High":
          priorityColor = "rgba(255, 0, 0, 0.8)";
          break;
        default:
          priorityColor = "white";
      }
      return (
        <Link to={`/${task.userId}/tasks/${task._id}`}>
          <div className="task" style={{ backgroundColor: priorityColor }}>
            <h3>{task.title}</h3>
            <h4>Priority: {task.priority}</h4>
            <h4>Est. Hours To Complete: {task.estimatedHours}</h4>
          </div>
        </Link>
      );
    });
    return (
      <div>
        <h2>Tasks</h2>
        <Link to={`/${this.props.userId}/newtask`}>
          <button>Create New Task</button>
        </Link>
        <div className="task-list">{taskList}</div>
      </div>
    );
  }
}
