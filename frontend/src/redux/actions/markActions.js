import axios from 'axios'
const { ADD_MARK } = require("../types/markTypes")

export const addMarkAct = (coords, adress) => async (dispatch) => {
  try {
    const addedItem = await axios.post('http://localhost:3005/marker', { coords, adress })
    dispatch(addMark(addedItem.data))
  } catch (e) {
    console.log('error')
  }
}

export const addMark = (newMark) => {
  return {
    type: ADD_MARK,
    payload: newMark
  }
}
