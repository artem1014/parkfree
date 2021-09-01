import { useEffect, useState } from "react";
import "./YandexMap.css";
import axios from "axios";
import React from "react";
import { SEND_FORMS } from "../../urls/url";
import style from "../testImage/style.module.css";
import { useLocation } from "react-router";
import { ReactReduxContext, useDispatch } from "react-redux";
import { acceptMarkAct, addMarkAct } from "../../redux/actions/markActions";
import SendingForm from "../SendingForm/SendingForm";
import { addNotification } from "../../redux/actions/notificationAC";

export default function Map({}) {
  let myPlacemark;
  // const arr = [{ coords: [55.729324292067254, 37.65196207958984], adress: 'Россия, Москва, Шлюзовая набережная' }, { coords: [55.76069738614288, 37.64234904248048], adress: 'Россия, Москва, Чистопрудный бульвар, 12к7А' }]

  const [allMarks, setAllMarks] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:3005/allAccepted').then(res => {
  //     setAllMarks(res.data)
  //   })
  // }, [])

  let arr = [...allMarks];
  // let a = allMarks?.allMarkers
  // console.log(arr[0])
  // console.log(allMarks?.allMarkers[0]?.longitude)

  const [placemarkCoords, setPlacemarkCoords] = useState([]);
  const [adress, setAdress] = useState("");
  const [province, setProvince] = useState("");
  const [allPlacemarks, setAllPlacemarks] = useState([]);

  const location = useLocation(); //принимаем координаты новой метки из личного кабинета, чтобы высветить ее на карте
  const dispatch = useDispatch();

  const placemarkHandler = (e) => {
    e.preventDefault();
    // тут будет dispatch данных из локального стейта
    // window.ymaps.ready()

    const div = document.querySelector(".ymap");
    div.innerHTML = "";
    console.log(placemarkCoords);
    console.log(adress);
    // dispatch(addMarkAct(placemarkCoords[0], placemarkCoords[1], adress, e.target.comment.value, ))
    window.ymaps.ready(init);
    // madeMap.geoObjects.remove(myPlacemark)
  };

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
    bodyFormData.append("pics", image);
    bodyFormData.append("latitude", placemarkCoords[0]);
    bodyFormData.append("longitude", placemarkCoords[1]);
    bodyFormData.append("address", adress);
    bodyFormData.append("comment", e.target.comment.value);
    bodyFormData.append("parkingPlaces", 5);

    axios.post(SEND_FORMS, bodyFormData).then((res) => {
      dispatch(
        addNotification({ userID: res.data.userID, name: res.data.name })
      );
    });

    const div = document.querySelector('.ymap');
    div.innerHTML = '';
    console.log('placemarkCoords', placemarkCoords)
    // console.log('adress', adress)
    window.ymaps.ready(init);
  };

  const init = () => {
    console.log("==========>", arr);

    const myMap = new window.ymaps.Map(
      "map",
      {
        center: [55.753994, 37.622093],
        zoom: 11,
        behaviors: ["drag", "dblClickZoom"], //убираем масштабирование карты при скролле, оставляем масштабирование при клике мыши
      },
      {
        searchControlProvider: "yandex#search",
      }
    );

    setAdress("");
    // setAllPlacemarks([])

    if (location.state) {
      //добавляем на карту метку из админского кабинета !!!! надо сделать удаление по переходу на новую страницу
      let adminNewPlacemark = new window.ymaps.Placemark(location.state.coords);
      adminNewPlacemark.properties.set({
        iconCaption: location.state.adress,
        balloonContent: location.state.adress,
      });
      myMap.geoObjects.add(adminNewPlacemark);
    }

    console.log("dgsdg", allMarks);

    if (allMarks.length) {
      for (let i = 0; i < allMarks.length; i++) {
        console.log("dsfsgsgsdgdsgdsgsdg");
        console.log(allMarks[i].pics);
        let pl = new window.ymaps.Placemark([
          allMarks[i].latitude,
          allMarks[i].longitude,
        ]);
        pl.properties.set({
          iconCaption: allMarks[i].address,
          balloonContent: `<div> ${allMarks[i].address} <br/> <img className='stat' src=http://localhost:3005/uploads/${allMarks[i].pics} /> </div>`,
        });
        myMap.geoObjects.add(pl);
      }
    }

    //   // console.log(arr[i]);
    // }

    // myPlacemark = createPlacemark([55.74741048760227, 37.604411878173835]); //создать метку
    // myMap.geoObjects.add(myPlacemark);  //опубликовать ее на экране

    // Слушаем клик на карте.
    myMap.events.add("click", function (e) {
      let newCoords = e.get("coords"); // вытяигиваем координаты
      if (myPlacemark) {
        // если метка создана
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
          hintContent: "ЗДАРОВА", //хинт при наведении на метку
          iconCaption: "поиск", // balloon
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
        var firstGeoObject = res.geoObjects.get(0); //адрес метки

        var x = res.geoObjects.get(0);

        setAdress(firstGeoObject.getAddressLine());

        // console.log(myGeocoder)

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
        // console.log('=======sa=f=saf=af=', firstGeoObject.getLocalities())

        // setAdress(myPlacemark.properties._data.balloonContent
      });
    }
  };

  // console.log(init())

  // console.log('adddees',adress)
  // if(adress){
  //   const prov = axios(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=3ec234ec-c933-467f-b4bb-4f217f11b450&geocode=${adress}`)
  //     .then(res => setProvince(res.data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[1].name))
  //   }
  //   console.log('province',province)

  useEffect(() => {
    axios.get("http://localhost:3005/allAccepted").then((res) => {
      setAllMarks(res.data);
    });
    // if (allMarks.length > 0) {
    window.ymaps.ready(init);
    // }
  }, [allMarks.length]);

  console.log(location.state);

  return (
    <div className="block-wrapper__map">
      <div id="map" className="ymap map"></div>
      <div className="shit2">
        {location.state && (
          <button onClick={() => dispatch(acceptMarkAct(location.state.id))}>
            {" "}
            Accept{" "}
          </button>
        )}
        {adress && placemarkCoords && (
          <SendingForm
            sendForm={sendForm}
            handleImageUpload={handleImageUpload}
            imageUploader={imageUploader}
            uploadedImage={uploadedImage}
          />
        )}
      </div>
    </div>
  );
}
