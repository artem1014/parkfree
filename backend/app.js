require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRouter");
const markerRouter = require("./routes/markerRouter");
const notificationRouter = require("./routes/notificationRouter");

// Картинки юзера кладет в /public/uploads
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/uploads"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

// const upload = multer({ storage, limits: { fieldSize: 25 * 1024 * 1024 } });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
// Middleware отлавливает картинки юзера
app.use(multer({ storage: storageConfig }).any("files"));

app.use("/user", userRouter);
app.use("/marker", markerRouter);
app.use("/notification", notificationRouter);

app.listen(process.env.PORT);
