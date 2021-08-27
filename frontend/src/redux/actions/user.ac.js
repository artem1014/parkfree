import { DELETE_USER, SET_USER } from "../types/userTypes"
// import axios from 'axios'
import { REGISTRATION_USER } from "../../urls/url"

// вызывает логику юзера
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
})

export const deleteUser = () => ({
  type: DELETE_USER
})

export const signUpStart = (payload, history) => async (dispatch) => { //регистрация
  const response = await fetch(REGISTRATION_USER, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(payload) //отправляем на бэк все данные введенные в форму
  })
  if (response.status === 200) {
    const user = await response.json()
    dispatch(setUser(user))
    history.replace('/'); //если успешно, переходим сюда
  } else {
    history.replace('/signup'); //иначе остаемся на странице реги
  }
}

export const signInStart = (payload, history, from) => async (dispatch) => { // вход
  const response = await fetch('http://localhost:3005/signin', { // вот тут я захардкодил путь, чтобы было понятнее
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(payload) //отправляем данные из формы
  })
  if (response.status === 200) {
    const user = await response.json()
    dispatch(setUser(user))
    history.replace(from); //если вошли удачно, то перекидываем на страницу с инфой о пользователе
  } else {
    history.replace('/signin') //иначе остаемся на странице входа
  }
}

export const signOutStart = () => async (dispatch) => { //выход
  const response = await fetch('http://localhost:3005/signout', {
    credentials: 'include'
  })
  if (response.status === 200) {
    dispatch(deleteUser()) // в state с юзером кладется null
  }
}

export const checkAuthStart = () => async (dispatch) => { //особая семеновская магия с проверкой аутентификации
  const response = await fetch('http://localhost:3005/check', {
    credentials: 'include'
  })
  if (response.status === 200) {
    const user = await response.json()
    dispatch(setUser(user))
  }
}


