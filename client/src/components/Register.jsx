import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  state = {
    newUser: {
      name: "",
      email: "",
      password: "",
      password2: ""
    },
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = event => {
    const copiedNewUser = { ...this.state.newUser };
    copiedNewUser[event.target.name] = event.target.value;
    this.setState({ newUser: copiedNewUser });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newUser = {
      name: this.state.newUser.name,
      email: this.state.newUser.email,
      password: this.state.newUser.password,
      password2: this.state.newUser.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <h1>Register</h1>
        <p>
          Already have an account? <Link to="/">Log In</Link>
        </p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.newUser.name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              value={this.state.newUser.email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              value={this.state.newUser.password}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="password2">Confirm Password: </label>
            <input
              type="password"
              name="password2"
              id="password2"
              value={this.state.newUser.password2}
              onChange={this.handleChange}
            />
          </div>
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
