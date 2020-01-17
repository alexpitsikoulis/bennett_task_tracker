import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Tasks extends Component {
	render() {
		const taskList = this.props.tasks.map(task => {
			return (
				<div>
					<Link to={`/${task.userId}/tasks/${task._id}`}>
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
				<Link to={`/${this.props.userId}/newtask`}>
					<button>Create New Task</button>
				</Link>
				{taskList}
			</div>
		);
	}
}
