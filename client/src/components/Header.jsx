import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <header>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>Bennett Task Tracker</h1>
        </Link>
      </header>
    );
  }
}
