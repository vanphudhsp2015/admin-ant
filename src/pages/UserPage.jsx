import React, { Component } from "react";
import PropTypes from "prop-types";
import { MasterLayout } from "../layouts";
import { BreadcrumbComponent, CustomComponent } from "../components";
import { connect } from "react-redux";
class UserPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLogout: false
    };
  }

  render() {
    return (
      <MasterLayout>
        <BreadcrumbComponent title="User" icon="user" />
        <CustomComponent />
      </MasterLayout>
    );
  }
}
UserPage.propTypes = {
  user: PropTypes.string
};
function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(UserPage);
