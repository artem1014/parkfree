import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  acceptMarkAct,
  declineMarkAct,
  deleteMarkAct,
} from "../../redux/actions/markActions";
// import './Mark.css'
import stylesMark from "./Mark.module.css";

const Mark = ({ adress, id, longitude, latitude, identificator, pic }) => {
  const coords = [latitude, longitude];

  const plInfo = { coords, adress, id, pic };

  const dispatch = useDispatch();

  let history = useHistory();

  const acceptHandler = () => {
    dispatch(acceptMarkAct(id));
  };

  // const marks = useSelector(state => console.log(state.marks))

  const onMapHandler = () => {
    history.push({
      pathname: "/map",
      state: plInfo,
    });
  };

  const declineHandler = () => {
    dispatch(declineMarkAct(id));
  };

  const deleteHandler = () => {
    dispatch(deleteMarkAct(id));
  };

  return (
    <div className="d-flex justify-content-center flex-row align-items-center">
      <img
        className={stylesMark.pic}
        src="https://static.thenounproject.com/png/141955-200.png"
        alt=""
      />
      <p> {adress} </p>
      <p>
        {" "}
        <img
          className={stylesMark.pic}
          src={`http://localhost:3005/uploads/${pic}`}
        />{" "}
      </p>
      <div className="d-flex align-items-center">
        {identificator ? (
          <>
            <button onClick={acceptHandler} className={stylesMark.button_marks}>
              {" "}
              Принять{" "}
            </button>
            <button onClick={onMapHandler} className={stylesMark.button_marks}>
              {" "}
              на карте{" "}
            </button>
            <button
              onClick={declineHandler}
              className={stylesMark.button_marks}
            >
              {" "}
              Отклонить{" "}
            </button>
          </>
        ) : (
          <button onClick={deleteHandler} className={stylesMark.button_marks}>
            {" "}
            Удалить{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default Mark;
