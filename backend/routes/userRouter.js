const checkAuth = require("../middlewares/checkAuth");
const { User } = require('../db/models')
const router = require("express").Router();

router.post("/signup", async (req, res) => {
  const { login, email, password } = req.body; // реструктуризация из req.body
  console.log('my log req body', req.body);
  const userFind = await User.findOne({ where: { email } });
  userFind
    ? res.json(false)
    : (user = await User.create({ login, email, password, role: "user" }));
  const { id } = user;
  res.status(200).json({ login, email, id });
});

router.get('/signout', async (req, res) => { //выход
  req.session.destroy((err) => { // удаляем сессию
    if (err) return res.sendStatus(500)
    res.clearCookie(req.app.get('cookieName')) //чистим куки
    return res.sendStatus(200)
  })
})

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    if (password === user.password) {
      // req.session.userId = user.id; /// отключили  не компайлился
      req.session.user = user
      //return res.status(200).json({ id: user.id, name: user.name });
      return res.status(200).json({ login: user.login });
    }
  }
  res.json(false);
});

router.get('/check', checkAuth, async (req, res) => { // проверка 
  try {
    const user = await User.findByPk(req.session.user.id, { password: 0 }) // find by "Primary Key"
    return res.json(user)
  } catch (error) {
    return res.sendStatus(500)
  }
})

module.exports = router;
