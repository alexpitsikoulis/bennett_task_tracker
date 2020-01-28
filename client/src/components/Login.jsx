import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

class Login extends Component {
  state = {
    userLoggingIn: {
      email: "",
      password: ""
    },
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = event => {
    const copiedUserLoggingIn = { ...this.state.userLoggingIn };
    copiedUserLoggingIn[event.target.name] = event.target.value;
    this.setState({ userLoggingIn: copiedUserLoggingIn });
  };

  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.userLoggingIn.email,
      password: this.state.userLoggingIn.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <h1>Please Log In</h1>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              value={this.state.userLoggingIn.email}
              onChange={this.handleChange}
            />
            <span className="red-text">{errors.emailnotfound}</span>
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              value={this.state.userLoggingIn.password}
              onChange={this.handleChange}
            />
            <span className="red-text">{errors.passwordincorrect}</span>
          </div>
          <input type="submit" value="Log In" />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
