const router = require("express").Router();

router.post("/registration", async (req, res) => {
  const { login, email, password, role } = req.body;
  const userFind = await User.findOne({ where: { email } });
  userFind
    ? res.json(false)
    : role !== "admin"
    ? (user = await User.create({ login, email, password, role: "user" }))
    : (user = await User.create({ login, email, password, role: "admin" }));
  const { id } = user;
  res.json({ login, email, id });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    if (password === user.password) {
      req.session.userId = user.id;
      req.session.userLogin = user.login;
      req.session.userEmail = user.email;
      return res.json({ id: user.id, name: user.name });
    }
  }
  res.json(false);
});

module.exports = router;
