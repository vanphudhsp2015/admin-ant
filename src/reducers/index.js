import { combineReducers } from 'redux'
import UserReducers from './users'
import PostsReducer from './posts'
const rootReducer = combineReducers({
  users: UserReducers,
  posts: PostsReducer
})
export default rootReducer
