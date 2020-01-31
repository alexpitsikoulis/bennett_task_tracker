import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Admin extends Component {
  handleDeleteAllFiles = () => {
    axios
      .delete("/api/files/all")
      .then(() => {
        console.log("done");
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    if (this.props.auth.user.name !== "Alex Pitsikoulis") {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1>Admin Panel</h1>
        <button onClick={this.handleDeleteAllFiles}>Delete All Files</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Admin);
