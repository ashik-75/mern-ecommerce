const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(__dirname, "../../", "frontend/public/upload");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    console.log(file);
    const extName = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(extName, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + extName);
  },
});

function findFileType(file, cb) {
  const fileType = /jpg|jpeg|png/;
  const extname = fileType.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );

  const checkMimeType =
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
      ? true
      : false;

  if (extname && checkMimeType) {
    console.log("type true");
    return cb(null, true);
  } else {
    return cb("Only jpg/jpeg/png file allowed");
  }
}

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    findFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/upload/${req.file.filename}`);
});

module.exports = router;
