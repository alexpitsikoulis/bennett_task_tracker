const express = require("express");
const FileCollection = require("../models/File");
const fileRouter = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary");

const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

const fileTypeFilter = function(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/i)) {
    return cb(new Error("This type of file is not accepted!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter: fileTypeFilter });

cloudinary.config({
  cloud_name: "ddight2eh",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

fileRouter.get("/", (req, res) => {
  FileCollection.find(function(err, files) {
    if (err) {
      res.json(err.message);
    } else {
      res.json(files);
    }
  });
});

fileRouter.get("/:taskId", (req, res) => {
  FileCollection.find({ taskId: req.params.taskId })
    .then(files => {
      res.json(files);
    })
    .catch(err => {
      res.json(err);
    });
});

fileRouter.post("/add", upload.single("file"), (req, res) => {
  cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
    if (err) {
      req.json(err.message);
    }
    req.body.image = result.secure_url;
    req.body.imageId = result.public_id;

    FileCollection.create(req.body, function(err, file) {
      if (err) {
        res.json(err.message);
      } else {
        res.json(file);
      }
    });
  });
});

fileRouter.delete("/all", (req, res) => {
  FileCollection.deleteMany()
    .then(files => {
      res.json(files);
    })
    .catch(err => {
      res.json(err);
    });
});

fileRouter.delete("/:fileId", (req, res) => {
  FileCollection.findByIdAndDelete(req.params.fileId)
    .then(file => {
      res.json(file);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = { fileRouter };
