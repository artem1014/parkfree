const router = require("express").Router();
const { Marker } = require("../db/models");
const { Image } = require("../db/models");
const { Notification } = require("../db/models");

router.post("/", async (req, res) => {
  console.log(req.body);
  // const {
  //   id,
  //   address,
  //   width,
  //   longitude,
  //   comment, // Необязательно
  //   parkingPlaces,
  //   images, // Принимает массив с картинками
  // } = req.body;

  // try {
  //   // Создаёт метку на карте со всеми данными
  //   const marker = await Marker.create({
  //     title,
  //     address,
  //     width,
  //     longitude,
  //     comment,
  //     parkingPlaces,
  //   });
  //   // Массив с картинками кладем в отдельную таблицу
  //   if (marker) {
  //     images.map((el) => Image.create({ name: el, markerID: id }));
  //   }
  // } catch (error) {}
  const {id, name} = await Notification.create({
    name: "Ожидайте подтверждения модератора",
    userID: 1,
  });

  // Отправляет данные на сервер
  res.json({id, name});
});

module.exports = router;
