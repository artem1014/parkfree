const router = require("express").Router();
const { Notification } = require("../db/models");

router.post("/", async (req, res) => {
  const { userID } = req.body;
  const notifications = await Notification.findAll({ where: { userID } });
  res.json(notifications);
});

router.delete("/", async (req, res) => {
  const { id } = req.body;
  // Задать userID
  const notifications = await Notification.destroy({
    where: { id, userID: 1 },
  });
  res.json(notifications);
});

router.delete("/all", async (req, res) => {
  const { userID } = req.body;
  const notifications = await Notification.destroy({ where: { userID: 1 } });
  res.json(notifications);
});

module.exports = router;
