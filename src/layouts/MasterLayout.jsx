import React, { Component } from "react";
import PropTypes from "prop-types";
import FooterLayout from "./FooterLayout";
import HeaderLayout from "./HeaderLayout";
import SidebarLayout from "./SidebarLayout";
class MasterLayout extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      toggle: false
    };
  }
  onToggle = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };
  render() {
    const childrenWidthProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {})
    );
    return (
      <div className="wrapper">
        <SidebarLayout toggle={this.state.toggle} />
        <main className="main">
          <HeaderLayout onToggle={this.onToggle} />
          <div className="container-fluid">{childrenWidthProps}</div>
          <FooterLayout />
        </main>
      </div>
    );
  }
}

MasterLayout.propTypes = {
  data: PropTypes.array
};

export default MasterLayout;
