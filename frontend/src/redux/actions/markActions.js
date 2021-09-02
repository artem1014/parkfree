import axios from 'axios'
const { ADD_MARK_TO_ACCEPT, ACCEPT_MARK, DECLINE_MARK, DELETE_MARK, GET_ALL_ACCEPTED_MARKS, GET_ALL_NEW_MARKS } = require("../types/markTypes")

export const addMarkAct =
  ({ longitude, latitude, address, comment, pics, parkingPlaces }) =>
    async (dispatch) => {
      console.log('in addMarkAct');
      console.log(longitude, latitude, address, comment, pics, parkingPlaces)
      try {
        const addedItem = await fetch("http://localhost:3005/marker/add", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          enctype: "multipart/form-data",
          credentials: 'include',
          body: JSON.stringify({
            longitude,
            latitude,
            address,
            comment,
            pics,
            parkingPlaces,
          })
        })

        const getAddedItem = await addedItem.json();
        console.log('blabla');
        console.log('ADDED DATA', getAddedItem);
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
      .post("http://localhost:3005/marker/accept", { id }, { withCredentials: true })
      .then((res) => dispatch(acceptMark(id)))
  } catch (e) {
    console.log('err')
  }
};

export const acceptMark = (id) => {
  return {
    type: ACCEPT_MARK,
    payload: id
  };
};

export const declineMarkAct = (id) => async (dispatch) => {
  try {
    const payload = (await axios.post("http://localhost:3005/marker/decline", { id }))
      .data;
    dispatch(declineMark(payload));
  } catch (e) {
    console.log("error");
  }
};

export const declineMark = (payload) => {
  return {
    type: DECLINE_MARK,
    payload
  }
}

export const deleteMarkAct = (id) => async (dispatch) => {
  try {
    axios.post('http://localhost:3005/marker/del', { id })
      .then(res => dispatch(deleteMark(id)))
  } catch (e) {
    console.log('error')
  }
}

export const deleteMark = (id) => {
  return {
    type: DELETE_MARK,
    payload: id
  }
}

export const getAllAcceptedMarkAct = () => async (dispatch) => {
  try {
    const allMarks = await axios.get('http://localhost:3005/marker/all')
    console.log('ETO AKSHON', allMarks.data)
    dispatch(getAllAcceptedMark(allMarks.data))
  } catch (e) {
    console.log('error')
  }
}

export const getAllAcceptedMark = (arrOfMarks) => {
  return {
    type: GET_ALL_ACCEPTED_MARKS,
    payload: arrOfMarks
  }
}

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
