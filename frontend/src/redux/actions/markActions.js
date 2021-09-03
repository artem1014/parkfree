import axios from "axios";
const {
  ADD_MARK_TO_ACCEPT,
  ACCEPT_MARK,
  DECLINE_MARK,
  DELETE_MARK,
  GET_ALL_ACCEPTED_MARKS,
  GET_ALL_NEW_MARKS,
} = require("../types/markTypes");

export const addMarkAct = (bodyFormData) => async (dispatch) => {
  try {
    const addedItem = await fetch("http://localhost:3005/marker/add", {
      method: "POST",
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      // enctype: "multipart/form-data",
      credentials: "include",
      body: bodyFormData,
    });
    const getAddedItem = await addedItem.json();
    dispatch(addMark(getAddedItem));
  } catch (e) {
    console.log("error");
  }
};

export const addMark = (newMark) => {
  return {
    type: ADD_MARK_TO_ACCEPT,
    payload: newMark,
  };
};

export const acceptMarkAct = (id) => async (dispatch) => {
  try {
    axios
      .post(
        "http://localhost:3005/marker/accept",
        { id },
        { withCredentials: true }
      )
      .then((res) => dispatch(acceptMark(id)));
  } catch (e) {
    console.log("err");
  }
};

export const acceptMark = (id) => {
  return {
    type: ACCEPT_MARK,
    payload: id,
  };
};

export const declineMarkAct = (id) => async (dispatch) => {
  try {
    await axios
      .post(
        "http://localhost:3005/marker/declineAct",
        { id },
        { withCredentials: true }
      )
      .then((res) => dispatch(declineMark(id)));
  } catch (e) {
    console.log("error");
  }
};

export const declineMark = (id) => {
  return {
    type: DECLINE_MARK,
    payload: id,
  };
};

export const deleteMarkAct = (id) => async (dispatch) => {
  try {
    axios
      .post("http://localhost:3005/marker/del", { id })
      .then((res) => dispatch(deleteMark(id)));
  } catch (e) {
    console.log("error");
  }
};

export const deleteMark = (id) => {
  return {
    type: DELETE_MARK,
    payload: id,
  };
};

export const getAllAcceptedMarkAct = () => async (dispatch) => {
  try {
    const allMarks = await axios.get("http://localhost:3005/marker/all");
    dispatch(getAllAcceptedMark(allMarks.data));
  } catch (e) {
    console.log("error");
  }
};

export const getAllAcceptedMark = (arrOfMarks) => {
  return {
    type: GET_ALL_ACCEPTED_MARKS,
    payload: arrOfMarks,
  };
};

// export const getAllNewMarkAct = () => async (dispatch) => {
//   try {
//     const allNewMarks = await axios.get('http://localhost:3005/marker/allNew')
//     console.log(allNewMarks.data)
//       dispatch(getAllNewMark(allNewMarks.data))
//   } catch (e) {
//     console.log('error')
//   }
// }

// export const getAllNewMark = (arrOfNewMarks) => {
//   return {
//     type: GET_ALL_NEW_MARKS,
//     payload: arrOfNewMarks
//   }
// }
