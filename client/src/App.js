import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import User from "./components/User";
import Header from "./components/Header";
import Task from "./components/Task";
import CreateNewTask from "./components/CreateNewTask";
import Login from "./components/Login";
import Register from "./components/Register";
import TasksAssinged from "./components/TasksAssigned";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/private-route/PrivateRoute";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute
                exact
                path="/tasksAssigned"
                component={TasksAssinged}
              />
              <PrivateRoute path="/:userId/newTask" component={CreateNewTask} />
              <PrivateRoute path="/:userId/tasks/:taskId" component={Task} />
              <PrivateRoute path="/:userId" component={User} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
