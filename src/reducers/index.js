import {combineReducers} from 'redux'
import blog from './blog'
import user from './user'
const rootReducer = combineReducers({
    blog,
    user
})
export default rootReducer