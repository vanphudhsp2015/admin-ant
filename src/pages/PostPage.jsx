import React, { Component } from "react";
import PropTypes from "prop-types";
import { MasterLayout } from "../layouts";
import { BreadcrumbComponent, CustomComponent } from "../components";
import { connect } from "react-redux";
import * as action from "../actions/postAction";
class PostPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLogout: false
    };
  }
  componentDidMount() {
    this.props.requestGetPost();
  }
  onAdd = data => {
    this.props.requestAddPost(data);
  };
  onDelete = id => {
    this.props.requestDeletePosts(id);
  };
  onUpdate = data => {
    this.props.requestUpdatePost(data);
  };
  onDeleteAll = data => {
    data.map(item => {
      this.props.requestDeletePosts(item.id);
      return [];
    });
  };
  onFilter = data => {
    this.props.requestFilterPosts(data);
  };
  formatArray(data) {
    return data.map(item => {
      return {
        key: item.id,
        id: item.id,
        title: item.title,
        images: item.images,
        author: item.author,
        categories: item.categories,
        tags: item.tags,
        visibility: item.visibility,
        commnets: item.commnets,
        views: item.views,
        date_create: item.date_create
      };
    });
  }
  render() {
    let { data, fetching, filter } = this.props;
    return (
      <MasterLayout>
        <BreadcrumbComponent title="Posts" icon="database" />
        <CustomComponent
          onUpdate={this.onUpdate}
          onDeleteAll={this.onDeleteAll}
          onDelete={this.onDelete}
          data={this.formatArray(data)}
          fetching={fetching}
          onAdd={this.onAdd}
          onFilter={this.onFilter}
          filter={this.formatArray(filter)}
        />
      </MasterLayout>
    );
  }
}
function mapStateToProps(state) {
  return {
    data: state.posts.all,
    fetching: state.posts.fetching,
    filter: state.posts.filter
  };
}
function mapDispatchToProps(dispatch, ownProps) {
  return {
    requestGetPost: () => dispatch(action.requestGetPost()),
    requestAddPost: data => dispatch(action.requestAddPost(data)),
    requestDeletePosts: id => dispatch(action.requestDeletePosts(id)),
    requestUpdatePost: data => dispatch(action.requestUpdatePost(data)),
    requestFilterPosts: value => dispatch(action.requestFilterPosts(value))
  };
}
PostPage.propTypes = {
  data: PropTypes.array,
  fetching: PropTypes.bool
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage);
