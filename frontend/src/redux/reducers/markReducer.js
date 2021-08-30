import { ACCEPT_MARK, ADD_MARK_TO_ACCEPT, DECLINE_MARK } from "../types/markTypes";

const markReducer = (state = [], action) => {

  switch (action.type) {
    case ADD_MARK_TO_ACCEPT:
      {
        return [...state, action.payload]
      }

    case ACCEPT_MARK:
      {
        // return (state.map(el => {
        //   if (el.id === action.payload) {
        //     return {
        //       ...el,
        //       isAccepted: !el.isAccepted,
        //       isChecked: true,
        //     }
        //   }
        //   return el
        // }))
        return action.payload
      }

    case DECLINE_MARK:
      {
        return action.payload
        // return (state.map(el => {
        //   if (el.id === action.payload) {
        //     return {
        //       ...el,
        //       isChecked: true,
        //     }
        //   }
        //   return el
        // }))
      }

    default:
      return state
  }
}

export default markReducer
