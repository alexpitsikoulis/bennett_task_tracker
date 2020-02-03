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
    const navLinkStyles = {
      color: "white",
      textDecoration: "none"
    };
    return (
      <header className="header">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>Bennett Task Tracker</h1>
        </Link>
        <nav>
          <a href={`/${this.props.auth.user.id}`} style={navLinkStyles}>
            My Tasks
          </a>
          <Link to="/" style={navLinkStyles}>
            All Users
          </Link>
          <Link to="/tasksAssigned" style={navLinkStyles}>
            Tasks I Have Assigned
          </Link>
          <Link to="/calendar" style={navLinkStyles}>
            My Calendar
          </Link>
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
