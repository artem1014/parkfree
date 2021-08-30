import axios from 'axios'
const { ADD_MARK_TO_ACCEPT, ACCEPT_MARK, DECLINE_MARK } = require("../types/markTypes")

export const addMarkAct = (longitude, latitude, adress, comment, pics, parkingPlaces, file) => async (dispatch) => {
  try {
    const addedItem = await axios.post('http://localhost:3005/marker', { longitude, latitude, adress, comment, pics, parkingPlaces, file })
    dispatch(addMark(addedItem.data))
  } catch (e) {
    console.log('error')
  }
}

export const addMark = (newMark) => {
  return {
    type: ADD_MARK_TO_ACCEPT,
    payload: newMark
  }
}

export const acceptMarkAct = (id) => async (dispatch) => {
  try {
    await axios.post('http://localhost:3005/accept', { id })
    dispatch(acceptMark(id))
  } catch (e) {
    console.log('error')
  }
}

export const acceptMark = (id) => {
  return {
    type: ACCEPT_MARK,
    payload: id
  }
}

export const declineMarkAct = (id) => async (dispatch) => {
  try {
    await axios.post('http://localhost:3005/decline', { id })
    dispatch(declineMark(id))
  } catch (e) {
    console.log('error')
  }
}

export const declineMark = (id) => {
  return {
    type: DECLINE_MARK,
    payload: id
  }
}
