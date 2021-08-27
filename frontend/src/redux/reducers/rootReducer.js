import { combineReducers } from 'redux';
import markReducer from './markReducer';

const rootReducer = combineReducers({
  marks: markReducer,
})

export default rootReducer
