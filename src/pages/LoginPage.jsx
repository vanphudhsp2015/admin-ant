import React, { Component } from "react";
import { FormLoginComponent } from "../components";
import { MasterLoginLayout } from "../layouts";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as action from "../actions/users";
import { withRouter, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { http } from "../library/interception/http";
import { message } from "antd";
const cookies = new Cookies();
class LoginPage extends Component {
  onLogin = data => {
    let self = this.props;
    return http
      .request({
        method: "POST",
        url: "/users/login/",
        data: {
          username: data.username,
          password: data.password
        }
      })
      .then(function(response) {
        cookies.set("data", response.users[0], { maxAge: 86400 });
        cookies.set("token", response.auth_token, { maxAge: 86400 });
        self.requestLogin(response);
        message
          .loading("Action in progress..", 2)
          .then(() => self.history.push("/users"));
      })
      .catch(function(error) {
        message
          .loading(error.messages[0].non_field_errors[0], 2)
          .then(() => message.error("Login failed"));
      });
  };
  render() {
    if (cookies.get("token") && cookies.get("data")) {
      return <Redirect to="/users" />;
    }
    return (
      <MasterLoginLayout views="LOGIN">
        <FormLoginComponent
          onLogin={this.onLogin}
          isLogin={true}
          views="LOGIN"
        />
      </MasterLoginLayout>
    );
  }
}
LoginPage.propTypes = {
  isLogin: PropTypes.bool,
  fetching: PropTypes.bool,
  isError: PropTypes.bool,
  requestLogin: PropTypes.func
};
function mapStateToProps(state) {
  return {
    isLogin: state.users.isLogin,
    isError: state.users.isError
  };
}
function mapDispatchToProps(dispatch, ownProps) {
  return {
    requestLogin: data => dispatch(action.requestLogin(data))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPage));
