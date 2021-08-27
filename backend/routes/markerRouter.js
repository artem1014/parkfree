const router = require("express").Router();
const { Marker } = require("../db/models");
const { Image } = require("../db/models");

router.post("/", async (req, res) => {
  const {
    id,
    address,
    width,
    longitude,
    comment, // Необязательно
    parkingPlaces,
    image, // Принимает массив с картинками
  } = req.body;

  try {
    // Создаёт метку на карте со всеми данными
    const marker = await Marker.create({
      title,
      address,
      width,
      longitude,
      comment,
      parkingPlaces,
    });
    // Массив с картинками кладем в отдельную таблицу
    if (marker) image.map((el) => Image.create({ name: el, markerID: id }));
  } catch (error) {}
  // Отправляет данные на сервер
  res.json();
});

module.exports = router;
