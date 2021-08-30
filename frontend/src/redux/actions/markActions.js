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
    const payload = (await axios.post('http://localhost:3005/accept', { id })).data
    dispatch(acceptMark(payload))
  } catch (e) {
    console.log('error')
  }
}

export const acceptMark = (payload) => {
  return {
    type: ACCEPT_MARK,
    payload
  }
}

export const declineMarkAct = (id) => async (dispatch) => {
  try {
    const payload = (await axios.post('http://localhost:3005/decline', { id })).data
    dispatch(declineMark(payload))
  } catch (e) {
    console.log('error')
  }
}

export const declineMark = (payload) => {
  return {
    type: DECLINE_MARK,
    payload
  }
}
