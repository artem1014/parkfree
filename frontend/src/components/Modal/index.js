import React from "react";
import ReactDom from "react-dom";
import style from "./style.module.css";

export default function Modal({ open }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <div className={style.form}>
      <h6>Мои уведомления</h6>
      <ul>
        <li>
          <a href="#">Notification1</a>
        </li>
        <li>
          <a href="#">Notification2</a>
        </li>
        <li>
          <a href="#">Notification3</a>
        </li>
        <li>
          <a href="#">NotifiNotification3cation3</a>
        </li>
      </ul>
    </div>,
    document.getElementById("portal")
  );
}
