import React, { Component } from "react";
import PropTypes from "prop-types";
import Logo from "../assets/images/logo.svg";
import { Icon, Switch } from "antd";
import { NavLink } from "react-router-dom";
class SidebarLayout extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isBackgroundDark: false
    };
  }

  onChange = checked => {
    this.setState({
      isBackgroundDark: !this.state.isBackgroundDark
    });
  };
  render() {
    return (
      <div
        className={
          this.state.isBackgroundDark === true
            ? "sidebar sidebar--dark"
            : "sidebar"
        }
      >
        <div className="logo">
          <img src={Logo} alt="Logo" />
          <span className="logo__title">ANTD ADMIN</span>
        </div>
        <div className="menu">
          <ul className="menu__list">
            <li className="item">
              <NavLink to="/" className="item__link ">
                <Icon type="dashboard" className="icon" />
                <span className="item__span">Dashboard</span>
              </NavLink>
            </li>
            <li className="item">
              <NavLink
                to="/users"
                exact
                activeClassName="item__link--active"
                className="item__link"
              >
                <Icon type="user" className="icon" />
                <span className="item__span">Users</span>
              </NavLink>
            </li>
            <li className="item">
              <NavLink
                to="/posts"
                exact
                activeClassName="item__link--active"
                className="item__link"
              >
                <Icon type="shopping-cart" className="icon" />
                <span className="item__span">Posts</span>
              </NavLink>
            </li>
            <li className="item">
              <NavLink to="/" className="item__link">
                <Icon type="pull-request" className="icon" />
                <span className="item__span">Request</span>
              </NavLink>
            </li>
            <li className="item">
              <NavLink to="/" className="item__link">
                <Icon type="camera" className="icon" />
                <span className="item__span">UI Element</span>
              </NavLink>
            </li>
            <li className="item">
              <NavLink to="/" className="item__link">
                <Icon type="area-chart" className="icon" />
                <span className="item__span">Charts</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="sidebar__footer">
          <p
            className="theme"
            style={
              this.state.isBackgroundDark
                ? {
                    color: "#fff"
                  }
                : {
                    color: "#1890ff"
                  }
            }
          >
            <Icon type="bulb" className="icon" />
            Switch Theme
          </p>
          <div className="switch">
            <Switch
              checkedChildren="Light"
              unCheckedChildren="Dark"
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

SidebarLayout.propTypes = {
  name: PropTypes.string
};

export default SidebarLayout;
