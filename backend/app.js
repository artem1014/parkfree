require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const checkAuth = require("./middlewares/checkAuth");
const app = express();
const userRouter = require("./routes/userRouter");
const markerRouter = require("./routes/markerRouter");
const path = require('path')
// const notificationRouter = require("./routes/notificationRouter");
const notificationRouter = require("./routes/notificationRouter");

// Картинки юзера кладет в /public/uploads
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/uploads"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

app.set("cookieName", "Elbrus");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(morgan("dev"));
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(cors({ origin: true, credentials: true }));
// Middleware отлавливает картинки юзера
app.use(multer({ storage: storageConfig }).any("file"));

app.use(
  session({
    // name: app.get("cookieName"),
    // store: new FileStore({}),
    secret: "sdg348g3g",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: false,
      // maxAge: 1e3 * 86400, // COOKIE'S LIFETIME — 1 DAY
    },
  })


);

app.use("/notification", notificationRouter);
app.use("/", userRouter);
app.use("/marker", markerRouter);

app.listen(process.env.PORT, () => {
  console.log("Server has been started on PORT:", process.env.PORT);
});
