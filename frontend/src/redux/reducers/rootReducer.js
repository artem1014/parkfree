import { combineReducers } from "redux";
import markReducer from "./markReducer";
import notificationReducer from "./notificationReduces";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  marks: markReducer,
  user: userReducer,
  notification: notificationReducer,
});

export default rootReducer;
