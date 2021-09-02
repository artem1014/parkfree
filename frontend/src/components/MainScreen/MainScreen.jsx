import React from "react";
//import Login from "../Login/Login";
import style from "./MainScreen.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import Account from "../Account/Account";

export default function MainScreen({ submitHandler }) {
  const user = useSelector((state) => state.user);
  // const user = localStorage.getItem("user"); // т.к. у нас есть д.б. нам уже не нужен локал сторэдж

  //const [modalShow, setModalShow] = useState(false);

  // const toggle = () => {
  //   setModalShow(!modalShow);
  // };

  useEffect(() => {
    eval(
      `try {
           TagCanvas.Start(
             'myCanvas',
             '',
             {textColour: 'white',
            //  {textColour: 'rgb(101, 125, 233)',
             outlineColour: '#03bcf4',
             fontweight:'bold', 
             filter: 'contrast(200%)',
             zoom: 1,
             initial: [0.14, 0.08],
             weightMode: "outline",
             weightSize: 3.0
            }
           );
         }
         catch(e) {
           const canvas = document.getElementById('myCanvasContainer');
          if(canvas)
          canvas.style.display = 'none';
        }`
    );
  }, [user]);
  return (
    <>
      {user ? (
        <div className={style.main_screen_wrapper}>
          {/* <Здесь будет вызываться личный кабинет юзера /> */}
          <Account />
        </div>
      ) : (
        <div className={style.main_screen_wrapper2}>
          <div className={style.greeting_area}>
            <div className={style.greeting_words}>
              <h4>Welcome to</h4>
              <h3>Park Free</h3>
              <NavLink to="/signin">
                {/* кнопка с первой станицы ведет на регистрацию */}
                <button className={style.button_register_top}>Sign In</button>
              </NavLink>
              <NavLink to="/signup">
                {/* кнопка с первой станицы ведет на регистрацию */}
                <button className={style.button_register}>Sign Up</button>
              </NavLink>
              {/* <p>In order to use our application, please register.</p> */}
            </div>
          </div>

          <div className={style.tags_area}>
            <canvas width="700" height="700" id="myCanvas">
              <ul>
                <li>
                  <a className={style.circle} href="#">
                    🚜 Ул.Пушкина
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚙 Ул.Ленина
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚲 Ул.Фестивальная
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚚 Ул.Гагарина
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚙 Ул.Лермонтова
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚜 Ул.Курчатова
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🛺 Ул.Брежнева
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚐 Ул.Орджоникидзе
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🛵 Ул.Неглинная
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚛 Садовое кольцо
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚖 Вознесенский переулок
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚍 Ул.Никольская
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🏎 ул.Фестивальная
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚖 рт.Антропова
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚎 Журнал
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚍 Шабловская
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚕 Ул.Первомайская
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚑 Ул.Ботанический Сад
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🛵 Крутицкий пер.
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🛥 Фрунзенская наб.
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚔 Ул.Охотный ряд
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚘 Ул.Большая Лубянка
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚲 Ул.Кузнецкий мост
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🛻 Ул.Бахатлукума
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚙Ул.Фестивальная
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🏍 Ул.Молодежная
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚔 ТЦ "Гагаринский"
                  </a>
                </li>
                <li>
                  <a className={style.circle} href="#">
                    🚎 Прт.Ленина
                  </a>
                </li>
              </ul>
            </canvas>
          </div>
        </div>
      )}
    </>
  );
}
