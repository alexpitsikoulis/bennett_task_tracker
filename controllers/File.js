const express = require("express");
const fileApi = require("../models/File");
const fileRouter = express.Router();

fileRouter.get("/", (req, res) => {
  fileApi
    .getAllFiles()
    .then(files => {
      res.json(files);
    })
    .catch(err => {
      res.json(err);
    });
});

fileRouter.get("/byTask/:taskId", (req, res) => {
  fileApi
    .getFilesByTaskId(req.params.taskId)
    .then(files => {
      res.json(files);
    })
    .catch(err => {
      res.json(err);
    });
});

fileRouter.get("/:fileId", (req, res) => {
  fileApi
    .getFileById(req.params.fileId)
    .then(file => {
      res.json(file);
    })
    .catch(err => {
      res.json(err);
    });
});

fileRouter.post("/", (req, res) => {
  fileApi
    .createFile(req.body)
    .then(file => {
      res.json(file);
    })
    .catch(err => {
      res.json(err);
    });
});

fileRouter.delete("/all", (req, res) => {
  fileApi
    .deleteAllFiles()
    .then(files => {
      res.json(files);
    })
    .catch(err => {
      res.json(err);
    });
});

fileRouter.delete("/:fileId", (req, res) => {
  fileApi
    .deleteFile(req.params.fileId)
    .then(file => {
      res.json(file);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = { fileRouter };
