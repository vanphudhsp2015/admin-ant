import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Button, message } from "antd";
import { connect } from "react-redux";
import * as action from "../actions/users";
import Cookies from "universal-cookie";
import { withRouter } from "react-router-dom";
import { http } from "../library/interception/http";
import { API_URL } from "../contants/ActionAPI";
const cookies = new Cookies();
class HeaderLayout extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLogin: false,
      isSetting: false
    };
  }
  componentDidMount() {
    this.onRequestCheckToken();
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  onRequestCheckToken() {
    let self = this.props;
    return http
      .request({
        method: "GET",
        url: "/users/current/"
      })
      .catch(function(error) {
        if (error.messages[0].detail === "Invalid token.") {
          cookies.remove("token");
          cookies.remove("data");
          message
            .loading("Action in progress..", 2)
            .then(() => self.history.push("/login"));
        }
      });
  }
  onToggle = () => {
    this.props.onToggle();
  };
  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        isSetting: false
      });
    }
  };
  setWrapperRef = node => {
    this.wrapperRef = node;
  };
  onSetting = () => {
    this.setState({
      isSetting: !this.state.isSetting
    });
  };
  onLogout = () => {
    let self = this.props;
    return http
      .request({
        method: "DELETE",
        url: "/users/delete/"
      })
      .then(function(response) {
        self.requestLogout(response);
        message
          .loading("Action in progress..", 2)
          .then(() => self.history.push("/login"));
        cookies.remove("token");
        cookies.remove("data");
      })
      .catch(function(error) {
        // console.log(error);
      });
  };
  render() {
    let user = "";
    if (cookies.get("data") !== undefined) {
      user = cookies.get("data").username;
    }
    return (
      <header className="header">
        <div className="block">
          <div className="block__left">
            <div className="toggle">
              <button className="toggle__button" onClick={this.onToggle}>
                <Icon type="menu-fold" />
              </button>
            </div>
          </div>
          <div className="block__right">
            <ul className="list">
              <li className="item">
                <button className="item__button">
                  <Icon type="bulb" />
                </button>
              </li>
              <li className="item item__dropdown" ref={this.setWrapperRef}>
                <button className="item__button" onClick={this.onSetting}>
                  Hi, {user}
                  <img
                    src={`${API_URL}${cookies.get("data").avatar}`}
                    alt="avatar"
                  />
                </button>
                <div
                  className={
                    this.state.isSetting ? "toggle toggle--active" : "toggle"
                  }
                >
                  <div className="toggle__item">
                    <Button className="button">
                      <Icon type="setting" /> Setting
                    </Button>
                  </div>
                  <div className="toggle__item">
                    <Button className="button">
                      <Icon type="info-circle" /> About
                    </Button>
                  </div>
                  <div className="toggle__item toggle__item--logout">
                    <Button className="button" onClick={this.onLogout}>
                      <Icon type="logout" /> Logout
                    </Button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

HeaderLayout.propTypes = {
  onToggle: PropTypes.func
};
function mapStateToProps(state) {
  return {
    data: state.users.all,
    isLogout: state.users.isLogout
  };
}
function mapDispatchToProps(dispatch, ownProps) {
  return {
    requestLogout: () => dispatch(action.requestLogout())
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HeaderLayout));
