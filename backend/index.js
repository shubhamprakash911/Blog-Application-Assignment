const express = require("express");
const cookitParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts.js");
const multer = require("multer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookitParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.listen(8000, () => {
  console.log("connected");
});
