import axios from "axios";
import {
  DELETE_ALL_NOTIFICATIONS_DB,
  DELETE_NOTIFICATION_DB,
  GET_ALL_NOTIFICATIONS_DB,
} from "../../urls/url";
import {
  DELETE_ALL_NOTIFICATION,
  GET_ALL_NOTIFICATIONS,
} from "../types/notificationTypes";

export const getAllNotificationsStart =
  ({ userID }) =>
  async (dispatch) => {
    axios
      .post(GET_ALL_NOTIFICATIONS_DB, { userID })
      .then((res) => dispatch(getAllNotifications(res.data)));
  };

export const getAllNotifications = (notifications) => ({
  type: GET_ALL_NOTIFICATIONS,
  payload: notifications,
});

export const deleteNotificationStart = (e) => async (dispatch) => {
  e.preventDefault();
  axios.delete(DELETE_NOTIFICATION_DB, { data: { id: e.target.id } });
};

export const deleteAllNotificationsStart =
  ({ userID }) =>
  async (dispatch) => {
    console.log(userID);
    axios
      .delete(DELETE_ALL_NOTIFICATIONS_DB, { data: {userID}  })
      .then(() => dispatch(deleteAllNotifications()));
  };

export const deleteAllNotifications = () => ({
  type: DELETE_ALL_NOTIFICATION,
});
