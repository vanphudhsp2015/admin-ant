import React, { Component } from "react";
import { FormLoginComponent } from "../components";
import { MasterLoginLayout } from "../layouts";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as action from "../actions/users";
import { withRouter } from "react-router-dom";
import { http } from "../library/interception/http";
import { message } from "antd";
import Cookies from "universal-cookie";
const cookies = new Cookies();
class ResetPasswordPage extends Component {
  onResetPassword = data => {
    let self = this.props;
    return http
      .request({
        method: "POST",
        url: `/users/login/`,
        data: {
          username: data.username,
          password: data.old_password
        }
      })
      .then(function(response) {
        cookies.set("token", response.auth_token, { maxAge: 36000 });
        http
          .request({
            method: "PUT",
            url: `/users/reset/${data.username}/`,
            data: {
              old_password: data.old_password,
              new_password: data.password
            }
          })
          .then(function(responseRest) {
            message
              .loading("Reset password success", 2)
              .then(() => self.history.push("/login"));
          });
      })
      .catch(function(error) {
        message
          .loading("Please watting...", 2)
          .then(() => message.error("Old password not wrong"));
      });
  };
  render() {
    return (
      <MasterLoginLayout views="RESET">
        <FormLoginComponent
          onResetPassword={this.onResetPassword}
          isLogin={false}
          views="RESET"
        />
      </MasterLoginLayout>
    );
  }
}
ResetPasswordPage.propTypes = {
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
    requestRegister: data => dispatch(action.requestRegister(data))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResetPasswordPage));
