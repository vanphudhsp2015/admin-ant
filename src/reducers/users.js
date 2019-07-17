import * as types from "../contants/ActionType";
const INITIAL_STATE = {
  all: [],
  isLogin: false,
  isLogout: false,
  fetching: false,
  fetched: false,
  isError: false
};
export default function(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case types.REQUEST_LOADING:
      return {
        ...state,
        fetching: true,
        fetched: INITIAL_STATE.fetched
      };
    case types.REQUEST_USERS_LOGIN:
      return Object.assign({}, state, {
        isLogin: true
      });
    case types.REQUEST_LOGOUT:
      return {
        ...state,
        isLogin: false,
        isLogout: true
      };
    case types.REQUEST_ERROR:
      return {
        ...state,
        isError: true
      };
    default:
      return {
        ...state
      };
  }
}
