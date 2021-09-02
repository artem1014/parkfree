import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { acceptMarkAct, declineMarkAct, deleteMarkAct } from "../../redux/actions/markActions";
import { acceptNotificationStart, declineNotificationStart } from "../../redux/actions/notificationAC";
import './Mark.css'

const Mark = ({ adress, id, longitude, latitude, identificator, pic }) => {

  const coords = [latitude, longitude]

  

  const plInfo = { coords, adress, id, pic }

  const dispatch = useDispatch();

  let history = useHistory();

  const acceptHandler = () => {
    dispatch(acceptMarkAct(id))
    dispatch(acceptNotificationStart(id))
  }

  // const marks = useSelector(state => console.log(state.marks))

  const onMapHandler = () => {
    history.push({
      pathname: '/map',
      state: plInfo,
    })
  }

  const declineHandler = () => {
    dispatch(declineMarkAct(id))
    dispatch(declineNotificationStart(id))
  }

  const deleteHandler = () => {
    dispatch(deleteMarkAct(id))
  }

  return (
    <div className="d-flex justify-content-center flex-row align-items-center">
      <img className='pic' src='https://static.thenounproject.com/png/141955-200.png' alt="" />
      <p> {adress} </p>
      <p> <img className='pic' src={`http://localhost:3005/uploads/${pic}`} /> </p>
      <div className='d-flex align-items-center'>
        {identificator
          ?
          <>
            <button onClick={acceptHandler} className='btn btn-success mx-2'> Accept </button>
            <button onClick={onMapHandler} className='btn btn-warning mx-2'> on Map </button>
            <button onClick={declineHandler} className='btn btn-danger mx-2'> Decline </button>
          </>
          :
          <button onClick={deleteHandler} className='btn btn-danger mx-2'> Delete </button>
        }
      </div>
    </div>
  )
}

export default Mark
