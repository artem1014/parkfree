import {
  ADD_NOTIFICATION,
  DELETE_ALL_NOTIFICATION,
  DELETE_NOTIFICATION,
  GET_ALL_NOTIFICATIONS,
  GET_NOTIFICATIONS_VALUE,
  RESET_NOTIFICATION,
} from "../types/notificationTypes";
import {
  ACCEPT_NOTIFICATION_DB,
  ADD_NOTIFICATION_DB,
  DECLINE_NOTIFICATION_DB,
  DELETE_ALL_NOTIFICATIONS_DB,
  DELETE_NOTIFICATION_DB,
  GET_ALL_NOTIFICATIONS_DB,
  GET_NOTIFICATIONS_VALUE_DB,
  UDDATE_STATUS_NOTIFICATIONS,
} from "../../urls/notificationURLS";
import axios from "axios";

export const addNotificationStart = () => async (dispatch) => {
  axios
    .get(ADD_NOTIFICATION_DB, { withCredentials: true })
    .then((res) => dispatch(addNotification(res.data)));
};

export const addNotification = (data) => ({
  type: ADD_NOTIFICATION,
  payload: data,
});

export const getAllNotificationsStart = () => async (dispatch) => {
  axios.get(GET_ALL_NOTIFICATIONS_DB, { withCredentials: true }).then((res) => {
    dispatch(getAllNotifications(res.data));
  });
};

export const getAllNotifications = (notifications) => ({
  type: GET_ALL_NOTIFICATIONS,
  payload: notifications,
});

export const getAllNotificationValueStart = () => async (dispatch) => {
  axios
    .get(GET_NOTIFICATIONS_VALUE_DB, { withCredentials: true })
    .then((res) => {
      dispatch(getNotificationsValue(res.data));
    });
};

export const getNotificationsValue = (value) => ({
  type: GET_NOTIFICATIONS_VALUE,
  payload: value,
});

export const deleteNotificationStart = (id) => async (dispatch) => {
  axios
    .delete(DELETE_NOTIFICATION_DB, { data: { id } }, { withCredentials: true })
    .then((res) => dispatch(deleteNotification(res.data)));
};

export const deleteNotification = (id) => ({
  type: DELETE_NOTIFICATION,
  payload: id,
});

export const deleteAllNotificationsStart = (setIsOpen) => async (dispatch) => {
  setIsOpen(false)
  axios
    .delete(DELETE_ALL_NOTIFICATIONS_DB, { withCredentials: true })
    .then(() => dispatch(deleteAllNotifications()));
};

export const deleteAllNotifications = () => ({
  type: DELETE_ALL_NOTIFICATION,
});

export const updateStatusNotificationsStart = () => async (dispatch) => {
  axios.get(UDDATE_STATUS_NOTIFICATIONS, { withCredentials: true });
  dispatch(resetNotifications());
};

export const resetNotifications = () => ({
  type: RESET_NOTIFICATION,
});

export const acceptNotificationStart = (id) => async (dispatch) => {
  axios.post(ACCEPT_NOTIFICATION_DB, { id }, { withCredentials: true });
};

export const declineNotificationStart = (id) => async (dispatch) => {
  axios.post(DECLINE_NOTIFICATION_DB, { id }, { withCredentials: true });
};
