import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import User from "./components/User";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:userId" component={User} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
