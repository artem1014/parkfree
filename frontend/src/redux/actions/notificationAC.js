import {
  ADD_NOTIFICATION,
  DELETE_ALL_NOTIFICATION,
  DELETE_NOTIFICATION,
  GET_ALL_NOTIFICATIONS,
  GET_NOTIFICATIONS_VALUE,
  RESET_NOTIFICATION,
} from "../types/notificationTypes";
import {
  DELETE_ALL_NOTIFICATIONS_DB,
  DELETE_NOTIFICATION_DB,
  GET_ALL_NOTIFICATIONS_DB,
  GET_NOTIFICATIONS_VALUE_DB,
  UDDATE_STATUS_NOTIFICATIONS,
} from "../../urls/url";
import axios from "axios";

export const addNotification = (data) => ({
  type: ADD_NOTIFICATION,
  payload: data,
});

export const getAllNotificationsStart = () => async (dispatch) => {
  axios.get(GET_ALL_NOTIFICATIONS_DB, { withCredentials: true }).then((res) => {
    dispatch(getAllNotifications(res.data));
  });
  axios.post(GET_NOTIFICATIONS_VALUE_DB).then((res) => {
    dispatch(getNotificationsValue(res.data));
  });
};

export const getAllNotifications = (notifications) => ({
  type: GET_ALL_NOTIFICATIONS,
  payload: notifications,
});

export const getNotificationsValue = (value) => ({
  type: GET_NOTIFICATIONS_VALUE,
  payload: value,
});

export const deleteNotificationStart = (id) => async (dispatch) => {
  axios
    .delete(DELETE_NOTIFICATION_DB, { data: { id } })
    .then((res) => dispatch(deleteNotification(res.data)));
};

export const deleteNotification = (id) => ({
  type: DELETE_NOTIFICATION,
  payload: id,
});

export const deleteAllNotificationsStart =
  ({ userID }) =>
  async (dispatch) => {
    axios
      .delete(DELETE_ALL_NOTIFICATIONS_DB, { data: { userID } })
      .then(() => dispatch(deleteAllNotifications()));
  };

export const deleteAllNotifications = () => ({
  type: DELETE_ALL_NOTIFICATION,
});

export const updateStatusNotificationsStart =
  ({ userID }) =>
  async (dispatch) => {
    axios.post(UDDATE_STATUS_NOTIFICATIONS, { userID });
    dispatch(resetNotifications());
  };

export const resetNotifications = () => ({
  type: RESET_NOTIFICATION,
});
