const router = require("express").Router();
const { Notification, Marker, Image, sequelize } = require("../db/models");

router.get("/", async (req, res) => {
  const count = await sequelize.query('SELECT count(*) FROM "Markers"');
  const markers = await Marker.findAll({ where: { isChecked: false } });
  res.json({ markers, count: count[0][0].count });
});

router.get("/all", async (req, res) => {
  const allMarkers = await Marker.findAll({ raw: true });
  res.json(allMarkers);
});

router.get("/allNew", async (req, res) => {
  const allNewMarkers = await Marker.findAll({ where: { isChecked: false } });
  res.json(allNewMarkers);
});

router.post("/add", async (req, res) => {
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

    const newMarkerFromDB = await Marker.create({
      longitude,
      latitude,
      address,
      comment,
      pics,
      parkingPlaces,
      userID,
    });

    const response = newMarkerFromDB.dataValues

    res.json(response)
  } catch (error) {
    console.log('ERROR IN CREATE', error);
    res.sendStatus(401)

  }
});

router.post("/", async (req, res) => {
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
  } catch (error) {
    console.log(error)
  }
})

router.post('/acceptNots', async (req, res) => {
  try {
    const { userID } = await Marker.findOne({ where: { id } });
    if (userID !== 2) {
      const { name } = await Notification.create({
        userID,
        name: "Ваша метка одобрена модератором",
      });
      const allMarkers = await Marker.findAll({});
      res.json({ name, allMarkers });
    }
  } catch (error) {
    console.log(error)
  }
})

router.post("/accept", async (req, res) => {
  try {
    const { id } = req.body;
    await Marker.update(
      { isAccepted: true, isChecked: true },
      { where: { id } }
    );
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
  };
})

router.post("/decline", async (req, res) => {
  try {
    const { id } = req.body;
    await Marker.update(
      { isChecked: true },
      { where: { id } }
    );
    const { userID } = await Marker.findOne({ where: { id } });
    const allMarkers = await Marker.findAll({});
    if (userID !== 2) {
      await Notification.create({
        userID,
        name: "Ваша метка не одобрена модератором",
      });
      res.json(allMarkers);
    }
  } catch (e) {
    console.log(e)
  }
});

router.post("/declineAct", async (req, res) => {
  try {
    const { id } = req.body;
    await Marker.update(
      { isChecked: true },
      { where: { id } }
    );
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
  }
});

router.post("/del", async (req, res) => {
  const { id } = req.body;
  const deleteItem = await Marker.destroy({ where: { id } });
  res.json();
});

module.exports = router;
