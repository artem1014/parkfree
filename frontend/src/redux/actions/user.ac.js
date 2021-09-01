import { DELETE_USER, SET_USER } from "../types/userTypes";
import {
  REGISTRATION_USER,
  SIGNIN_USER,
  SIGNOUT_USER,
  CHECK_USER,
} from "../../urls/userURLS";

// вызывает логику юзера
export const setUser = (user) => ({
  // 2!
  type: SET_USER,
  payload: user,
});

export const deleteUser = () => ({
  type: DELETE_USER,
});

export const signUpStart = (payload, history) => async (dispatch) => {
  //регистрация
  const response = await fetch(REGISTRATION_USER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // настройка для Cors
    body: JSON.stringify(payload), //отправляем на бэк все данные введенные в форму
  });
  if (response.status === 200) {
    const user = await response.json();
    console.log("USER SIGNED UP", user);
    dispatch(setUser(user));
    history.replace("/"); //если успешно, переходим сюда
  } else {
    history.replace("/signup"); //иначе остаемся на странице реги
  }
};

export const signInStart = (payload, history, from) => async (dispatch) => {
  // вход // setState can be here
  const response = await fetch(SIGNIN_USER, {
    // вот тут я захардкодил путь, чтобы было понятнее
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload), //отправляем данные из формы на бэк
  });
  if (response.status === 200) {
    const user = await response.json();
    // window.localStorage.setItem("user", JSON.stringify(user.login));
    dispatch(setUser(user));
    return history.replace(from); //если вошли удачно, то перекидываем на страницу с инфой о пользователе
  } else {
    return history.replace("/"); //иначе остаемся на странице входа
  }
};

export const signOutStart = () => async (dispatch) => {
  //выход
  const response = await fetch(SIGNOUT_USER, {
    credentials: "include",
  });
  // console.log("resporesponse", response);
  if (response.ok) {
    dispatch(deleteUser()); // в state с юзером кладется null
  }
};

export const checkAuthStart = () => async (dispatch) => {
  //особая семеновская магия с проверкой аутентификации
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
