import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { acceptMarkAct, declineMarkAct } from "../../redux/actions/markActions";

const Mark = ({coords, adress, id}) => {


  const plInfo = {coords, adress}

  const dispatch = useDispatch();

  let history = useHistory();

  const acceptHandler = () => {
    dispatch(acceptMarkAct(id))
  }

  const onMapHandler = () => {
    history.push({
      pathname: '/map',
      state: plInfo,
    })
  }

  const declineHandler = () => {
    dispatch(declineMarkAct(id))
  }

  return (
    <div className="d-flex justify-content-center flex-row align-items-center">
      <img src='https://static.thenounproject.com/png/141955-200.png'/>
      <p> координаты: {coords} </p>
      <p> адрес: {adress} </p>
      <div className='d-flex align-items-center'>
      <button onClick={acceptHandler} className='btn btn-success mx-2'> Accept </button> 
      <button onClick={onMapHandler} className='btn btn-warning mx-2'> on Map </button>
      <button onClick={declineHandler} className='btn btn-danger mx-2'> Decline </button>
      </div>
    </div>
  )
}

export default Mark