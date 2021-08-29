
// export default function init({ myPlacemark, }) {
//   // let myPlacemark;

//   const myMap = new window.ymaps.Map(
//     "map",
//     {
//       center: [55.753994, 37.622093],
//       zoom: 11,
//       behaviors: ['drag', 'dblClickZoom'] //убираем масштабирование карты при скролле, оставляем масштабирование при клике мыши
//     },
//     {
//       searchControlProvider: "yandex#search",
//     }
//   );

//   // myPlacemark = createPlacemark([55.74741048760227, 37.604411878173835]); //создать метку
//   // myMap.geoObjects.add(myPlacemark);  //опубликовать ее на экране

//   // Слушаем клик на карте.
//   myMap.events.add("click", function (e) {
//     var coords = e.get("coords"); // вытяигиваем координаты
//     // console.log(coords);

//     if (myPlacemark) { // если метка создана
//       myPlacemark.geometry.setCoordinates(coords);
//     }
//     // Если нет – создаем.
//     else {
//       myPlacemark = createPlacemark(coords);
//       myMap.geoObjects.add(myPlacemark);
//       // Слушаем событие окончания перетаскивания на метке.
//       myPlacemark.events.add("dragend", function () {
//         getAddress(myPlacemark.geometry.getCoordinates());
//       });
//     }
//     getAddress(coords);
//   });

//   // Создание метки.
//   function createPlacemark(coords) {
//     return new window.ymaps.Placemark(
//       coords,
//       {
//         hintContent: 'ЗДАРОВА', //хинт при наведении на метку
//         iconCaption: "поиск" // balloon 
//       },
//       {
//         preset: "islands#blueAutoIcon", //preset
//         draggable: true,
//       }
//     );
//   }

//   // Определяем адрес по координатам (обратное геокодирование).
//   function getAddress(coords) {
//     myPlacemark.properties.set("iconCaption", "поиск...");
//     window.ymaps.geocode(coords).then(function (res) {
//       var firstGeoObject = res.geoObjects.get(0);
//       // console.log(firstGeoObject.getAddressLine()); //адрес метки

//       myPlacemark.properties.set({
//         // Формируем строку с данными об объекте.
//         iconCaption: [
//           // Название населенного пункта или вышестоящее административно-территориальное образование.
//           firstGeoObject.getLocalities().length
//             ? firstGeoObject.getLocalities()
//             : firstGeoObject.getAdministrativeAreas(),
//           // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
//           firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
//         ]
//           .filter(Boolean)
//           .join(", "),
//         // В качестве контента балуна задаем строку с адресом объекта.
//         // balloonContent: firstGeoObject.getAddressLine(),
//       });
//     });
//   }
// }
