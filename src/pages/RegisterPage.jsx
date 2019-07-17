import React, { Component } from "react";
import { FormLoginComponent } from "../components";
import { MasterLoginLayout } from "../layouts";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as action from "../actions/users";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import { http } from "../library/interception/http";
import { message } from "antd";
const cookies = new Cookies();
class RegisterPage extends Component {
  onRegister = data => {
    let self = this.props;
    return http
      .request({
        method: "POST",
        url: "/users/",
        data: {
          username: data.username,
          password: data.password,
          confirm_password: data.confirm_password
        }
      })
      .then(function(response) {
        cookies.set("data", response.data, { maxAge: 86400 });
        cookies.set("token", response.data.token, { maxAge: 86400 });
        self.requestRegister(response);
        message
          .loading("Action in progress..", 2)
          .then(() => self.history.push("/users"));
      })
      .catch(function(error) {
        message
          .loading(error.messages[0].username[0], 2)
          .then(() => message.error("Register failed"));
      });
  };
  render() {
    return (
      <MasterLoginLayout views="REGISTER">
        <FormLoginComponent
          onRegister={this.onRegister}
          isLogin={false}
          views="REGISTER"
        />
      </MasterLoginLayout>
    );
  }
}
RegisterPage.propTypes = {
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
)(withRouter(RegisterPage));
