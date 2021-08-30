const router = require("express").Router();
const { Marker } = require("../db/models");
const { Image } = require("../db/models");
const { Notification } = require("../db/models");

// router.post("/", (req, res) => {
//   console.log('=====', req.body);
// });

router.post('/accept', (req, res) => {
  if (req.body) {
    const { id } = req.body;
    DB.todos.map(el => {
      if (el.id === id) {
        el.isAccepted = !el.isAccepted
        el.isChecked = true
        return el
      } else
        return el
    })
    res.sendStatus(200)
  }
});

router.post('/decline', (req, res) => {
  if (req.body) {
    const { id } = req.body;
    DB.todos.map(el => {
      if (el.id === id) {
        el.isChecked = true
        return el
      } else
        return el
    })
    res.sendStatus(200)
  }
})

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
  await Notification.create({
    name: "Ожидайте подтверждения модератора",
    userID: 1,
  });

  // Отправляет данные на сервер
  res.json("");
});

module.exports = router;
