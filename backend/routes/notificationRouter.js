// const router = require("express").Router();
// const { Notification } = require("../db/models");

// router.post("/", async (req, res) => {
//   const { userID } = req.session.id;
//   console.log(userID)
//   const notifications = await Notification.findAll({ where: { userID: 1 } });
//   res.json(notifications);
// });

// router.delete("/", async (req, res) => {
//   const { id } = req.body;
//   await Notification.destroy({
//     where: { id },
//   });
//   res.json(id);
// });

// router.delete("/all", async (req, res) => {
//   const { userID } = req.body;
//   const notifications = await Notification.destroy({ where: { userID: 1 } });
//   res.json(notifications);
// });

// router.post("/status", async (req, res) => {
//   const { userID } = req.body;
//   await Notification.update({ viewed: true }, { where: { userID: 1 } });
// });

// router.post("/value", async (req, res) => {
//   const { userID } = req.body;
//   const notifications = await Notification.findAll({
//     where: { userID, viewed: false },
//   });
//   res.json(notifications.length);
// });

// module.exports = router;
