import React, { Component } from "react";
import axios from "axios";

export default class Task extends Component {
	state = {
		task: {},
		errors: []
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
			})
			.catch(err => {
				this.setState({ errors: err.data });
			});
	};

	render() {
		return (
			<div>
				<h1>{this.state.task.title}</h1>
				<h3>Priority: {this.state.task.priority}</h3>
				<h3>
					Estimated Hours To Complete:{" "}
					{this.state.task.estimatedHours}
				</h3>
				<p>{this.state.task.description}</p>
			</div>
		);
	}
}
