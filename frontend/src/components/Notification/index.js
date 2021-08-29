import { useDispatch } from "react-redux";
import "simplebar/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import style from "./style.module.css";
import ReactDom from "react-dom";
import {
  deleteAllNotificationsStart,
  deleteNotificationStart,
} from "../../redux/actions/notificationAC";

export default function Notification({ open, notifications }) {
  const dispatch = useDispatch();
  if (!open) return null;

  return ReactDom.createPortal(
    <SimpleBar style={{ maxHeight: 300 }} className={style.form}>
      <ul>
        <div className={style.together}>
          <h6>Мои уведомления</h6>
          <h6
            onClick={() => dispatch(deleteAllNotificationsStart({ userID: 1 }))}
            className={style.erase}
          >
            Стереть
          </h6>
        </div>
        {notifications.length ? (
          notifications.map((el) => (
            <div>
              <li className={style.together}>
                {el.name}
                <img
                  onClick={(e) => dispatch(deleteNotificationStart(e))}
                  id={el.id}
                  className={style.cross}
                  src="./images/cross-sign.svg"
                  alt="#"
                />
              </li>
            </div>
          ))
        ) : (
          <p className={style.empty}>Пусто</p>
        )}
      </ul>
    </SimpleBar>,
    document.getElementById("portal")
  );
}
