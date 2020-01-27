import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>Bennett Task Tracker</h1>
        </Link>
        <nav>
          <a href={`/${this.props.auth.user.id}`}>My Tasks</a>
          <Link to="/">All Users</Link>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Header);
