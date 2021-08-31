import {
  ADD_NOTIFICATION,
  DELETE_ALL_NOTIFICATION,
  DELETE_NOTIFICATION,
  GET_ALL_NOTIFICATIONS,
  GET_NOTIFICATIONS_VALUE,
  RESET_NOTIFICATION,
} from "../types/notificationTypes";

const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        notification: [...state.notification, action.payload],
        notificationValue: state.notificationValue + 1,
      };

    case GET_ALL_NOTIFICATIONS:
      return { ...state, notification: action.payload };

    case DELETE_NOTIFICATION:
      return {
        ...state,
        notification: state.notification.filter(
          (el) => el.id !== action.payload
        ),
      };

    case DELETE_ALL_NOTIFICATION:
      return { ...state, notification: [] };

    case RESET_NOTIFICATION:
      return { ...state, notificationValue: null };

    case GET_NOTIFICATIONS_VALUE:
      return { ...state, notificationValue: action.payload };

    default:
      return state;
  }
};

export default notificationReducer;
