import { combineReducers } from 'redux';
import markReducer from './markReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  marks: markReducer,
  user: userReducer
})

export default rootReducer
