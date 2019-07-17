import * as types from '../contants/ActionType'
const INITIAL_STATE = {
  all: [],
  fetching: false,
  fetched: false,
  filter: []
}
const filetItems = (array, query) => {
  return array.filter(
    el => el.author.toLowerCase().indexOf(query.toLowerCase()) > -1
  )
}
export default function (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case types.REQUEST_LOADING:
      return {
        ...state,
        fetching: true,
        fetched: INITIAL_STATE.fetched
      }
    case types.REQUEST_GET_POSTS:
      return {
        ...state,
        all: action.payload,
        fetching: INITIAL_STATE.fetching,
        fetched: true
      }
    case types.REQUEST_ADD_POSTS:
      return {
        ...state,
        all: [...state.all, action.payload],
        fetching: INITIAL_STATE.fetching,
        fetched: true
      }
    case types.REQUEST_DELETE_POSTS:
      return {
        ...state,
        all: state.all.filter(item => item.id !== action.payload),
        fetching: INITIAL_STATE.fetching,
        fetched: true
      }
    case types.REQUEST_UPDATE_POSTS:
      return {
        ...state,
        all: state.all.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
        fetching: INITIAL_STATE.fetching,
        fetched: true
      }
    case types.REQUEST_FILTER_POSTS:
      return {
        ...state,
        filter: filetItems(state.all, action.payload),
        fetching: INITIAL_STATE.fetching,
        fetched: true
      }
    default:
      return {
        ...state
      }
  }
}
