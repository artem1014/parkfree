const router = require("express").Router();
const { Notification, Marker, Image, sequelize } = require("../db/models");

router.get("/marker", async (req, res) => {
  const count = await sequelize.query('SELECT count(*) FROM "Markers"');
  const markers = await Marker.findAll({ where: { isChecked: false } });
  res.json({ markers, count: count[0][0].count });
});

router.post("/marker", async (req, res) => {
  console.log('HEYEHYEHEYE', req.session)
  console.log("=============", req.body);
  const { longitude, latitude, address, comment, pics, parkingPlaces } =
    req.body;
  const newMarker = {
    longitude,
    latitude,
    address,
    comment,
    pics,
    parkingPlaces,
  };
  await Marker.create({
    longitude,
    latitude,
    address,
    comment,
    pics,
    parkingPlaces,
  });
  const { name, userID } = await Notification.create({
    userID: 1,
    name: "Ожидайте подтверждения модератора",
  });
  console.log(name, userID);
  res.json({ newMarker, name, userID });
});

router.post("/accept", (req, res) => {
  if (req.body) {
    const { id } = req.body;
    DB.todos.map((el) => {
      if (el.id === id) {
        el.isAccepted = !el.isAccepted;
        el.isChecked = true;
        return el;
      } else return el;
    });
    res.sendStatus(200);
  }
});

router.post("/decline", (req, res) => {
  if (req.body) {
    const { id } = req.body;
    DB.todos.map((el) => {
      if (el.id === id) {
        el.isChecked = true;
        return el;
      } else return el;
    });
    res.sendStatus(200);
  }
});

router.post("/", async (req, res) => {
  // console.log(req.body);
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
  const { id, name } = await Notification.create({
    name: "Ожидайте подтверждения модератора",
    userID: 1,
  });

  // Отправляет данные на сервер
  res.json({ id, name });
});

module.exports = router;
