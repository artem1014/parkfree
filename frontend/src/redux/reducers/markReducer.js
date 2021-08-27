import { ADD_MARK } from "../types/markTypes";

const markReducer = (state = [], action) => {

  switch (action.type) {
    case ADD_MARK:
      {
        return [...state, action.payload]
      }

    default:
      return state
  }
}

export default markReducer
