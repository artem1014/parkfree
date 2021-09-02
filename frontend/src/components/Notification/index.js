import { useDispatch, useSelector } from "react-redux";
import "simplebar/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import style from "./style.module.css";
import ReactDom from "react-dom";
import {
  deleteAllNotificationsStart,
  deleteNotificationStart,
} from "../../redux/actions/notificationAC";

export default function Notification({ open, setIsOpen }) {
  const { notification } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  if (!open) return null;
  console.log(notification);

  return ReactDom.createPortal(
    <SimpleBar style={{ maxHeight: 300 }} className={style.form}>
      <ul>
        <div className={style.together}>
          <h6>Уведомления</h6>
          <h6
            onClick={() => dispatch(deleteAllNotificationsStart(setIsOpen))}
            className={style.erase}
          >
            Стереть
          </h6>
        </div>
        {notification.length ? (
          notification.map((el) => (
            <li key={el.id} className={style.together}>
              {el.name}
              <img
                onClick={() => dispatch(deleteNotificationStart(el.id))}
                id={el.id}
                className={style.cross}
                src="/images/cross-sign.svg"
                alt="#"
              />
            </li>
          ))
        ) : (
          <p className={style.empty}>Пусто</p>
        )}
      </ul>
    </SimpleBar>,
    document.getElementById("portal")
  );
}
