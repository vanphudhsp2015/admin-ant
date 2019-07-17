import * as types from "../contants/ActionType";
export function requestLogin(data) {
  return dispatch => {
    dispatch(receiveData(types.REQUEST_USERS_LOGIN, data));
  };
}
export function requestRegister(data) {
  return dispatch => {
    dispatch(receiveData(types.REQUEST_REGISTER, data));
  };
}
export function requestLogout(data) {
  return dispatch => {
    dispatch(receiveData(types.REQUEST_LOGOUT, data));
  };
}
export function requestCurrentToken(data) {
  return dispatch => {
    dispatch(receiveData(types.REQUEST_CURRENT_TOKEN, data));
  };
}
export function receiveData(action, payload) {
  return {
    type: action,
    payload
  };
}
export function requestRejected(action, response) {
  return {
    type: action,
    payload: response
  };
}
export function requestLoading(action) {
  return { type: action };
}
