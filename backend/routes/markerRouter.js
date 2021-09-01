const router = require("express").Router();
const { Notification, Marker, Image, sequelize } = require("../db/models");

router.get("/marker", async (req, res) => {
  const count = await sequelize.query('SELECT count(*) FROM "Markers"');
  const markers = await Marker.findAll({ where: { isChecked: false } });
  res.json({ markers, count: count[0][0].count });
});

router.get("/allAccepted", async (req, res) => {
  const allMarkers = await Marker.findAll({ where: { isAccepted: true } });
  res.json(allMarkers);
});

router.post("/marker", async (req, res) => {
  try {
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
    const userID = req.session.user.id;

    if (userID !== 2) {
      await Marker.create({
        longitude,
        latitude,
        address,
        comment,
        pics,
        parkingPlaces,
        userID,
      });
      const { name } = await Notification.create({
        userID,
        name: "Ожидайте подтверждения модератора",
      });
      await Notification.create({
        userID: 2,
        name: "Пришла новая метка на согласование",
      });
      res.json({ newMarker, name, userID });
    } else {
      await Marker.create({
        longitude,
        latitude,
        address,
        comment,
        pics,
        parkingPlaces,
        userID,
        isAccepted: true,
        isChecked: true,
      });
    }
  } catch (error) {}
});

router.post("/accept", async (req, res) => {
  try {
    const { id } = req.body;
    await Marker.update(
      { isAccepted: true, isChecked: true },
      { where: { id } }
    );
    const { userID } = await Marker.findOne({ where: { id } });
    if (userID !== 2) {
      const { name } = await Notification.create({
        userID,
        name: "Ваша метка одобрена модератором",
      });
      const allMarkers = await Marker.findAll({});
      // allMarkers.map(async (el) => {
      //   if (el.id === id) {
      //     el.isAccepted = !el.isAccepted;
      //     el.isChecked = true;
      //     await Marker.update({where: {id}})
      //     return el;
      //   } else return el;
      // });
      res.json({ name, allMarkers });
    }
  } catch (error) {}
});

router.post("/decline", async (req, res) => {
  const { id } = req.body;
  await Marker.update({ isChecked: true }, { where: { id } });
  const { userID } = await Marker.findOne({ where: { id } });
  const allMarkers = await Marker.findAll({});
  if (userID !== 2) {
    await Notification.create({
      userID,
      name: "Ваша метка не одобрена модератором",
    });
    res.json(allMarkers);
  }
});

router.post("/del", async (req, res) => {
  // console.log(req.body)
  const { id } = req.body;
  const deleteItem = await Marker.destroy({ where: { id } });
  res.json();
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
