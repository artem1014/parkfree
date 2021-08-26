const router = require("express").Router();

router.post("/", (req, res) => {
  console.log(req.body);
  console.log("tut");
});

module.exports = router;
