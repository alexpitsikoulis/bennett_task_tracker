import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import User from "./components/User";
import Header from "./components/Header";
import Task from "./components/Task";
import CreateNewUser from "./components/CreateNewUser";
import CreateNewTask from "./components/CreateNewTask";

function App() {
	return (
		<div className='App'>
			<Router>
				<Header />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/newUser' component={CreateNewUser} />
					<Route path='/:userId/newTask' component={CreateNewTask} />
					<Route path='/:userId/tasks/:taskId' component={Task} />
					<Route path='/:userId' component={User} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
