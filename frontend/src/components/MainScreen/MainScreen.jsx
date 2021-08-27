// import ProductCarusel from "../ProductCarousel/ProductCarusel";
// import ShowProducts from "../ShowProducts/ShowProducts";
import Login from "../Login/Login";
import style from "./MainScreen.module.css";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MainScreen() {
  // const userRedux = useSelector(state => state.user);
  // console.log('hey yo');
  const user = localStorage.getItem("user");
  // console.log('user is ');
  const [modalShow, setModalShow] = useState(false);
  const toggle = () => {
    setModalShow(!modalShow);
  };

  useEffect(() => {
    eval(
      `try {
           TagCanvas.Start(
             'myCanvas',
             '',
             {textColour: 'goldenrod',
             outlineColour: '#03bcf4', 
             zoom: 1.1,
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
  }, []);
  return (
    <>
      {user ? (
        <div className={style.main_screen_wrapper}>
          {/* <ProductCarusel />
      <ShowProducts /> */}
        </div>
      ) : (
        <div className={style.main_screen_wrapper2}>
          <div className={style.greeting_area}>
            <div className={style.greeting_words}>
              <h2>Приветствуем вас в приложении</h2>
              {/* <h2></h2> */}
              <h1>Park free</h1>
              {modalShow && <Login toggle={toggle} />}
              <button
                onClick={() => {
                  // toggle();
                }}
                className={style.button_register}
              >
                Зарегистрироваться
              </button>
              <p>
                Для того что бы использовать приложение, пожалуйста,
                зарегистрируйтесь.
              </p>
            </div>
          </div>
          <div className={style.tags_area}>
            <canvas width="700" height="700" id="myCanvas">
              <ul>
                <li>
                  <a href="#">Ул.Пушкина</a>
                </li>
                <li>
                  <a href="#">Ул.Ленина</a>
                </li>
                <li>
                  <a href="#">Ул.Фестивальная</a>
                </li>
                <li>
                  <a href="#">Ул.Гагарина</a>
                </li>
                <li>
                  <a href="#">Ул.Лермонтова</a>
                </li>
                <li>
                  <a href="#">Ул.Курчатова</a>
                </li>
                <li>
                  <a href="#">Ул.Брежнева</a>
                </li>
                <li>
                  <a href="#">Куртка</a>
                </li>
                <li>
                  <a href="#">Джинсы</a>
                </li>
                <li>
                  <a href="#">Трусы</a>
                </li>
                <li>
                  <a href="#">Купальник</a>
                </li>
                <li>
                  <a href="#">Шкатулка</a>
                </li>
                <li>
                  <a href="#">Ваза</a>
                </li>
                <li>
                  <a href="#">Картина</a>
                </li>
                <li>
                  <a href="#">Журнал</a>
                </li>
                <li>
                  <a href="#">Книга</a>
                </li>
                <li>
                  <a href="#">Пальто</a>
                </li>
                <li>
                  <a href="#">Ботинки</a>
                </li>
                <li>
                  <a href="#">Лыжи</a>
                </li>
                <li>
                  <a href="#">Коньки</a>
                </li>
                <li>
                  <a href="#">Коробка</a>
                </li>
                <li>
                  <a href="#">Матрас</a>
                </li>
                <li>
                  <a href="#">Подушка</a>
                </li>
                <li>
                  <a href="#">Плед</a>
                </li>
                <li>
                  <a href="#">Кастрюля</a>
                </li>
                <li>
                  <a href="#">Гаечный ключ</a>
                </li>
                <li>
                  <a href="#">Стол</a>
                </li>
                <li>
                  <a href="#">Диван</a>
                </li>
                <li>
                  <a href="#">Ярик-козел!</a>
                </li>
              </ul>
            </canvas>
          </div>
        </div>
      )}
    </>
  );
}
