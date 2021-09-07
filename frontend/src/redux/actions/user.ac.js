import { DELETE_USER, SET_USER } from "../types/userTypes";
import {
  REGISTRATION_USER,
  SIGNIN_USER,
  SIGNOUT_USER,
  CHECK_USER,
} from "../../urls/userURLS";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const deleteUser = () => ({
  type: DELETE_USER,
});

export const signUpStart = (payload, history) => async (dispatch) => {
  const response = await fetch(REGISTRATION_USER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload), 
  });
  if (response.status === 200) {
    const user = await response.json();
    dispatch(setUser(user));
    history.replace("/map"); 
  } else {
    history.replace("/signup");
  }
};

export const signInStart = (payload, history, from) => async (dispatch) => {
  const response = await fetch(SIGNIN_USER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload), 
  });
  if (response.status === 200) {
    const user = await response.json();
    dispatch(setUser(user));
    return history.replace(from);
  } else {
    return history.replace("/");
  }
};

export const signOutStart = () => async (dispatch) => {
  const response = await fetch(SIGNOUT_USER, {
    credentials: "include",
  });
  if (response.ok) {
    dispatch(deleteUser());
    localStorage.removeItem('user');
  }
};

export const checkAuthStart = () => async (dispatch) => {
  const response = await fetch(CHECK_USER, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(),
  });
  if (response.status === 200) {
    const user = await response.json();
    dispatch(setUser(user));
  }
};
