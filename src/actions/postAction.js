import * as types from "../contants/ActionType";
import { http } from "../library/interception/http";
import { message } from "antd";
export function requestGetPost() {
  return dispatch => {
    dispatch(requestLoading(types.REQUEST_LOADING));
    http
      .request({
        method: "GET",
        url: "/posts/"
      })
      .then(function(response) {
        dispatch(receiveData(types.REQUEST_GET_POSTS, response));
      })
      .catch(function(error) {
        dispatch(requestRejected(types.REQUEST_ERROR, error));
      });
  };
}
export function requestAddPost(data) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("author", data.author);
  formData.append("categories", data.categories);
  if (data.images !== "") {
    formData.append("images", data.images.file.originFileObj);
  }
  formData.append("tags", data.tags);
  formData.append("visibility", data.visibility);
  return dispatch => {
    dispatch(requestLoading(types.REQUEST_LOADING));
    http
      .request({
        method: "POST",
        url: "/posts/",
        data: formData
      })
      .then(function(response) {
        dispatch(receiveData(types.REQUEST_ADD_POSTS, response.data));
      })
      .catch(function(error) {
        dispatch(requestRejected(types.REQUEST_ERROR, error));
      });
  };
}
export function requestDeletePosts(id) {
  return dispatch => {
    dispatch(requestLoading(types.REQUEST_LOADING));
    http
      .request({
        method: "DELETE",
        url: `/posts/${id}/`
      })
      .then(function(response) {
        message.success("Delete success");
        dispatch(receiveData(types.REQUEST_DELETE_POSTS, id));
      })
      .catch(function(error) {
        dispatch(requestRejected(types.REQUEST_ERROR, error));
      });
  };
}
export function requestUpdatePost(data) {
  const formData = new FormData();
  formData.append("id", data.id);
  formData.append("title", data.title);
  formData.append("author", data.author);
  formData.append("categories", data.categories);
  if (data.images !== "") {
    formData.append("images", data.images.file.originFileObj);
  }
  formData.append("tags", data.tags);
  formData.append("visibility", data.visibility);
  return dispatch => {
    dispatch(requestLoading(types.REQUEST_LOADING));
    http
      .request({
        method: "PUT",
        url: `/posts/${data.id}/`,
        data: formData
      })
      .then(function(response) {
        dispatch(receiveData(types.REQUEST_UPDATE_POSTS, response.data));
      })
      .catch(function(error) {
        dispatch(requestRejected(types.REQUEST_ERROR, error));
      });
  };
}
export function requestFilterPosts(value) {
  return dispatch => {
    dispatch(receiveData(types.REQUEST_FILTER_POSTS, value));
  };
}
export function requestLoading(action) {
  return { type: action };
}
export function requestRejected(action, response) {
  return {
    type: action,
    payload: response
  };
}
export function receiveData(action, payload) {
  return {
    type: action,
    payload
  };
}
