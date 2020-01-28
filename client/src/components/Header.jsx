import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Header extends Component {
  handleLogoutUser = () => {
    this.props.logoutUser();
    window.href = "/";
  };

  render() {
    return (
      <header className="header">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>Bennett Task Tracker</h1>
        </Link>
        <nav>
          <a href={`/${this.props.auth.user.id}`}>My Tasks</a>
          <Link to="/">All Users</Link>
          <Link to="/tasksAssigned">Tasks I Have Assigned</Link>
        </nav>
        {this.props.auth.user.name ? (
          <div className="logout">
            <h5>User Logged In: {this.props.auth.user.name}</h5>
            <button onClick={this.handleLogoutUser}>Log Out</button>
          </div>
        ) : null}
      </header>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Header);
