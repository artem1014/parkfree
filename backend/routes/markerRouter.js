const router = require("express").Router();

router.post("/", (req, res) => {
  console.log('=====', req.body);
});

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
});

module.exports = router;
