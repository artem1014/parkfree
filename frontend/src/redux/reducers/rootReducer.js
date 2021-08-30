import { combineReducers } from "redux";
import markReducer from "./markReducer";
import notificationReducer from "./notificationReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  marks: markReducer,
  user: userReducer,
  notifications: notificationReducer,
});

export default rootReducer;
