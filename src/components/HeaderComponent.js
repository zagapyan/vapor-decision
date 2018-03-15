"use strict";

import React from "react";
import { hashHistory, Link } from "react-router";
// import { logout } from '../helpers/auth'
import "../styles//Header.scss";

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertClass: this.props.authed ? "" : "text-center",
      message: this.props.authed ? "" : "You are currently not logged in.",
      loginStyle:
        this.props.location.pathname == "/login" ? { display: "none" } : {}
    };
  }
  onLogout(e) {
    e.preventDefault();
    this.props.handleLogout();
  }
  componentWillMount() {}
  componentDidMount() {}
  render() {
    this.props.location.pathname !== "/login";
    const loginTrigger =
      this.props.location.pathname !== "login" ? (
        this.props.authed ? (
          <button
            onClick={this.onLogout.bind(this)}
            className="btn btn-danger logout-button"
          >
            Log Out
          </button>
        ) : (
          <Link
            to="login"
            className="btn btn-danger logout-button"
            style={this.state.loginStyle}
          >
            Login
          </Link>
        )
      ) : (
        ""
      );
    return (
      <div className="header-component">
        <div className="container">
          <div className="col-xs-2" />
          <div className="col-xs-8">
            <h1 className="site-header text-center">
              <Link to="/">Vapor Decision</Link>
            </h1>
          </div>
          <div className="col-xs-2">
            <div className="row">{loginTrigger}</div>
          </div>
        </div>
        <p className={this.state.alertClass}>{this.state.message}</p>
      </div>
    );
  }
}

HeaderComponent.displayName = "HeaderComponent";

// Uncomment properties you need
// HeaderComponent.propTypes = {};
// HeaderComponent.defaultProps = {};

export default HeaderComponent;
