import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { acceptMarkAct, declineMarkAct, deleteMarkAct } from "../../redux/actions/markActions";
import { acceptNotificationStart, declineNotificationStart } from "../../redux/actions/notificationAC";
import stylesMark from "./Mark.module.css";

const Mark = ({ adress, id, longitude, latitude, identificator, pic }) => {
  const coords = [latitude, longitude];
  console.log('Hey, soul sister')

  const plInfo = { coords, adress, id, pic };

  const dispatch = useDispatch();

  let history = useHistory();

  const acceptHandler = () => {
    dispatch(acceptMarkAct(id))
    dispatch(acceptNotificationStart(id))
  }

  const onMapHandler = () => {
    history.push({
      pathname: "/map",
      state: plInfo,
    });
  };

  const declineHandler = () => {
    dispatch(declineMarkAct(id))
    dispatch(declineNotificationStart(id))
  }

  const deleteHandler = () => {
    dispatch(deleteMarkAct(id));
  };

  return (
    <div className={stylesMark.item}>
      <div>
        <div style={{ display: 'flex' }}>
          <div className={stylesMark.pic}>
            <img

              src={`http://localhost:3005/uploads/${pic}`}
            />
          </div>
          {adress} </div>
      </div>
      <div className={stylesMark.buttonWrapper}>
        {identificator ? (
          <>
            <button onClick={acceptHandler} className={stylesMark.acc}>
              Принять</button>
            <button onClick={onMapHandler} className={stylesMark.acc}>
              На карте</button>
            <button
              onClick={declineHandler}
              className={stylesMark.acc}
            > Отклонить </button>
          </>
        ) : <button onClick={deleteHandler} className={stylesMark.button_marks}>
          Удалить
        </button>}
      </div>
    </div>
  );
};

export default Mark;
