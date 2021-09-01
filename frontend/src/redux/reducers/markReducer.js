import { ACCEPT_MARK, ADD_MARK_TO_ACCEPT, DECLINE_MARK, DELETE_MARK, GET_ALL_ACCEPTED_MARKS, GET_ALL_NEW_MARKS } from "../types/markTypes";

const markReducer = (state = [], action) => {

  switch (action.type) {
    case ADD_MARK_TO_ACCEPT:
      {
        return [...state, action.payload]
      }

    case ACCEPT_MARK:
      {
        return (state.map(el => {
          if (el.id === action.payload) {
            return {
              ...el,
              isAccepted: true,
              isChecked: true,
            }
          }
          return el
        }))
      }

    case DECLINE_MARK:
      {
        return action.payload
      }

    case DELETE_MARK:
      {
        return state.filter(el => el.id != action.payload)
      }

    case GET_ALL_ACCEPTED_MARKS: // метки для админского кабинета
      {
        return action.payload
      }

    case GET_ALL_NEW_MARKS: //метки для админского кабинета
      {
        return action.payload
      }

    default:
      return state
  }
}

export default markReducer
