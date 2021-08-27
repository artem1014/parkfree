import { useEffect, useState } from "react";
import './YandexMap.css'
import axios from 'axios'
import React from 'react'
import { SEND_FORMS } from "../../urls/url";
import style from '../testImage/style.module.css'


export default function Map({ }) {

  let myPlacemark;
  const arr = [{ coords: [55.729324292067254, 37.65196207958984], adress: 'Россия, Москва, Шлюзовая набережная' }, { coords: [55.76069738614288, 37.64234904248048], adress: 'Россия, Москва, Чистопрудный бульвар, 12к7А' }]
  const [placemarkCoords, setPlacemarkCoords] = useState([])
  const [adress, setAdress] = useState('')
  const [allPlacemarks, setAllPlacemarks] = useState([])

  const placemarkHandler = () => {
    // тут будет dispatch данных из локального стейта 
    // window.ymaps.ready()
    const div = document.querySelector('.ymap');
    div.innerHTML = '';
    console.log(placemarkCoords)
    console.log(adress)
    window.ymaps.ready(init);
    // madeMap.geoObjects.remove(myPlacemark)
  }

  // для отправки комментов и фоток
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const sendForm = (e) => {
    e.preventDefault();
    // Получаем все значения из формы по атрибуту name
    const { file } = Object.fromEntries(new FormData(e.target));
    // console.log(file);
    const image = file.name;

    // Эта штука собирает все значения через append и через axios отправляет на back
    let bodyFormData = new FormData();
    bodyFormData.append("file", file);
    bodyFormData.append("image", image);
    bodyFormData.append("width", placemarkCoords[0])
    bodyFormData.append("longitude", placemarkCoords[1])
    bodyFormData.append("address", adress)
    bodyFormData.append("parkingPlaces", 5)

    axios.post(SEND_FORMS, bodyFormData);

    const div = document.querySelector('.ymap');
    div.innerHTML = '';
    console.log(placemarkCoords)
    console.log(adress)
    window.ymaps.ready(init);
  };


  const init = () => {

    const myMap = new window.ymaps.Map(
      "map",
      {
        center: [55.753994, 37.622093],
        zoom: 11,
        behaviors: ['drag', 'dblClickZoom'] //убираем масштабирование карты при скролле, оставляем масштабирование при клике мыши
      },
      {
        searchControlProvider: "yandex#search",
      }
    );

    setAdress('')
    setAllPlacemarks([])

    for (let i = 0; i < arr.length; ++i) {
      let pl = new window.ymaps.Placemark(arr[i].coords);
      pl.properties.set({
        iconCaption: arr[i].adress,
        balloonContent: arr[i].adress,
      });
      myMap.geoObjects.add(pl);
      // console.log(arr[i]);
    }

    // myPlacemark = createPlacemark([55.74741048760227, 37.604411878173835]); //создать метку
    // myMap.geoObjects.add(myPlacemark);  //опубликовать ее на экране

    // Слушаем клик на карте.
    myMap.events.add("click", function (e) {
      let newCoords = e.get("coords"); // вытяигиваем координаты
      if (myPlacemark) { // если метка создана
        myPlacemark.geometry.setCoordinates(newCoords);
        // myMap.geoObjects.remove(myPlacemark)
      }
      // Если нет – создаем.
      else {
        myPlacemark = createPlacemark(newCoords);
        myMap.geoObjects.add(myPlacemark);
        // Слушаем событие окончания перетаскивания на метке.
        myPlacemark.events.add("dragend", function () {
          getAddress(myPlacemark.geometry.getCoordinates());
        });
      }
      setPlacemarkCoords(myPlacemark.geometry._coordinates);
      getAddress(newCoords);
    });

    // Создание метки.
    function createPlacemark(coords) {
      return new window.ymaps.Placemark(
        coords,
        {
          hintContent: 'ЗДАРОВА', //хинт при наведении на метку
          iconCaption: "поиск" // balloon 
        },
        {
          preset: "islands#blueAutoIcon", //preset
          draggable: true,
        }
      );
    }

    // Определяем адрес по координатам (обратное геокодирование).
    async function getAddress(coords) {
      myPlacemark.properties.set("iconCaption", "поиск...");

      window.ymaps.geocode(coords).then(function (res) {
        var firstGeoObject = res.geoObjects.get(0);//адрес метки
        setAdress(firstGeoObject.getAddressLine())

        myPlacemark.properties.set({
          // Формируем строку с данными об объекте.
          iconCaption: [
            // Название населенного пункта или вышестоящее административно-территориальное образование.
            firstGeoObject.getLocalities().length
              ? firstGeoObject.getLocalities()
              : firstGeoObject.getAdministrativeAreas(),
            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
          ]
            .filter(Boolean)
            .join(", "),
          // В качестве контента балуна задаем строку с адресом объекта.
          balloonContent: firstGeoObject.getAddressLine(),
        });

        // setAdress(myPlacemark.properties._data.balloonContent
      });
    }
  }

  // console.log(init())

  useEffect(() => {
    window.ymaps.ready(init);
  }, []);

  return (
    <>
      <div id="map" className='ymap'>
      </div>
      {adress && placemarkCoords &&
        <form onSubmit={sendForm}>
          <div className={style.div}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={imageUploader}
              style={{
                display: "none",
              }}
              name="file"
            />
            <div
              style={{
                height: "100px",
                width: "100px",
                border: "1px dashed black",
              }}
              onClick={() => imageUploader.current.click()}
            >
              <img
                ref={uploadedImage}
                style={{
                  width: "100px",
                  // height: "100px",
                  // position: "absolute"
                }}
              />
            </div>
          </div>
          <button>Send</button>
          {/* <button onClick={placemarkHandler}> Отправить метку на согласование </button> */}
        </form>
      }
    </>

  )
}
