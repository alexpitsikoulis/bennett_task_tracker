import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Login from "./Login";

class Home extends Component {
  state = {
    users: [],
    errors: []
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios
      .get("/api/users")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        this.setState({ errors: err.data });
      });
  };

  render() {
    const userList = this.state.users
      .sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        } else return 0;
      })
      .map(user => {
        return (
          <div name={user.name}>
            <h2>
              <Link to={`/${user._id}`}>{user.name}</Link>
            </h2>
          </div>
        );
      });
    return (
      <div>
        <h1>All Users</h1>
        <Link to="/newuser">
          <button>Create New User</button>
        </Link>
        {userList}
      </div>
    );
  }
}

Home.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
