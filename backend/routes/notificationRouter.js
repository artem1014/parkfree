const router = require("express").Router();
const { Notification } = require("../db/models");

router.post("/", async (req, res) => {
  const userID = req.session.user.id;
  if (userID !== 2) {

    const { name } = await Notification.create({
      userID,
      name: "Ожидайте подтверждения модератора",
    });
    await Notification.create({
      userID: 2,
      name: "Пришла новая метка на согласование",
    });
    res.json({ newMarker, name, userID });
  }
})

router.get("/", async (req, res) => {
  try {
    const userID = req.session.user.id;
    const notifications = await Notification.findAll({ where: { userID } });
    res.json(notifications);
  } catch (error) { }
});

router.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    await Notification.destroy({
      where: { id },
    });
    res.json(id);
  } catch (error) { }
});

router.delete("/all", async (req, res) => {
  try {
    const userID = req.session.user.id;
    const notifications = await Notification.destroy({ where: { userID } });
    res.json(notifications);
  } catch (error) { }
});

router.get("/status", async (req, res) => {
  try {
    const userID = req.session.user.id;
    await Notification.update({ viewed: true }, { where: { userID } });
  } catch (error) { }
});

router.get("/value", async (req, res) => {
  try {
    const userID = req.session.user.id;
    const notifications = await Notification.findAll({
      where: { userID, viewed: false },
    });
    res.json(notifications.length);
  } catch (error) { }
});

module.exports = router;
