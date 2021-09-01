const { checkAuth } = require("../middlewares/checkAuth");
const { User } = require("../db/models");
const router = require("express").Router();

router.post("/signup", async (req, res) => {
  const { login, email, password } = req.body; // реструктуризация из req.body
  const userFind = await User.findOne({ where: { email } });
  userFind
    ? res.json(false)
    : (user = await User.create({ login, email, password, role: "user" }));
  req.session.user = user;

  const { id } = user;
  res.status(200).json({ login, email, id });
});

router.get("/signout", async (req, res) => {
  //выход
  req.session.destroy((err) => {
    // удаляем сессию
    if (err) return res.sendStatus(500);
    res.clearCookie(req.app.get("cookieName")); //чистим куки
    return res.sendStatus(200);
  });
});

router.post("/signin", async (req, res) => {
  try {

    const { email, password } = req.body;
    // console.log('singin', req.body)
    const user = await User.findOne({ where: { email } });
    console.log('=====user', user)
    console.log('=====password', password)
    console.log('=====user.password', user.password)
    console.log(password === user.password)
    if (user) {
      if (password === user.password) {
        req.session.user = user;
        //return res.status(200).json({ id: user.id, name: user.name });
        return res
          .status(200)
          .json({ login: user.login, email: user.email, id: user.id, role: user.role });
      }
      return res.status(400);
    }
  } catch (e) {
    console.log(e)
  }
});

router.get("/check", checkAuth, async (req, res) => {
  // проверка
  try {
    const user = await User.findByPk(req.session.user.id, { password: 0 }); // find by "Primary Key"
    return res.json(user);
  } catch (error) {
    return res.sendStatus(500);
  }
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
  res.json({ id, name });
});

module.exports = router;
