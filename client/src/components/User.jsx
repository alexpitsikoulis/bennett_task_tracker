import React, { Component } from "react";
import axios from "axios";
import Tasks from "./Tasks";

export default class User extends Component {
	state = {
		user: {},
		tasks: [],
		errors: []
	};

	componentDidMount() {
		this.getUser();
	}

	getUser = () => {
		axios
			.get(`/api/users/${this.props.match.params.userId}`)
			.then(res => {
				axios
					.get(`/api/users/${this.props.match.params.userId}/tasks`)
					.then(res2 => {
						this.setState({
							user: res.data,
							tasks: res2.data
						});
					});
			})
			.catch(err => {
				this.setState({ err: err.data });
			});
	};

	render() {
		return (
			<div>
				<h1>{this.state.user.name}</h1>
				<Tasks tasks={this.state.tasks} userId={this.state.user._id} />
			</div>
		);
	}
}
