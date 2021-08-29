import {
  DELETE_ALL_NOTIFICATION,
  GET_ALL_NOTIFICATIONS,
} from "../types/notificationTypes";

const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_NOTIFICATIONS:
      return action.payload;

    case DELETE_ALL_NOTIFICATION:
      return [];

    default:
      return state;
  }
};

export default notificationReducer;
