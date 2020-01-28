import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Tasks extends Component {
  priorityFilterAndMap = p => {
    return this.props.tasks
      .filter(task => {
        return task.priority === p;
      })
      .map(task => {
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
          <Link
            to={`/${task.userId}/tasks/${task._id}`}
            style={{ color: "black", textDecoration: "none" }}
            key={task._id}
          >
            <div className="task" style={{ backgroundColor: priorityColor }}>
              <h3>{task.title}</h3>
              <h4>Priority: {task.priority}</h4>
              <h4>Est. Hours To Complete: {task.estimatedHours}</h4>
            </div>
          </Link>
        );
      });
  };
  render() {
    return (
      <div>
        <h1>{this.props.openOrFinished} Tasks</h1>
        {this.props.assignedBy !== true ? (
          <Link to={`/${this.props.userId}/newtask`}>
            <button>Create New Task</button>
          </Link>
        ) : null}
        <div className="task-list">
          {this.priorityFilterAndMap("High")}
          {this.priorityFilterAndMap("Medium")}
          {this.priorityFilterAndMap("Low")}
        </div>
      </div>
    );
  }
}
