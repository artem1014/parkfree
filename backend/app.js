require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const app = express();
const userRouter = require("./routes/userRouter");
const markerRouter = require("./routes/markerRouter");
const notificationRouter = require("./routes/notificationRouter");

// Картинки юзера кладет в /public/uploads
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/uploads"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

app.set("cookieName", "Elbrus"); // поменяйте имя куки

// const upload = multer({ storage, limits: { fieldSize: 25 * 1024 * 1024 } });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
// Middleware отлавливает картинки юзера
app.use(multer({ storage: storageConfig }).any("files"));

app.use(
  session({
    name: app.get("cookieName"),
    secret: "sdg348g3g",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({}),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1e3 * 86400, // COOKIE'S LIFETIME — 1 DAY
    },
  })
),
  app.use("/user", userRouter);
app.use("/marker", markerRouter);
app.use("/notification", notificationRouter);

app.listen(process.env.PORT, () => {
  console.log("Server has been started on PORT:", process.env.PORT);
});
