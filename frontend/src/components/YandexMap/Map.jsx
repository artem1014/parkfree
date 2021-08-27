import { useEffect, useState } from "react";
import './YandexMap.css'
import axios from 'axios'

export default function Map({ }) {
  let myPlacemark;

  const [placemarkCoords, setPlacemarkCoords] = useState([])
  const [adress, setAdress] = useState('')
  const [madeMap, setMadeMap] = useState(null)

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
      {adress && placemarkCoords && <button onClick={placemarkHandler}> Отправить метку на согласование </button>}
    </>
  )
}
