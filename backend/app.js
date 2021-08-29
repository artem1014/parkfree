require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRouter");
const markerRouter = require("./routes/markerRouter");
//const PORT = 3005;
// Картинки юзера кладет в /public/uploads
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/uploads"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
// Middleware отлавливает картинки юзера
app.use(multer({ storage: storageConfig }).single("file"));

app.use("/user", userRouter);
app.use("/marker", markerRouter);

//app.listen(process.env.PORT);

app.listen(PORT, () => {
  console.log('Server has been started on PORT:', PORT);
});


