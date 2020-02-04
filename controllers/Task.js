const express = require("express");
const taskApi = require("../models/Task");
const fileApi = require("../models/File");
const taskRouter = express.Router({ mergeParams: true });

taskRouter.get("/", (req, res) => {
  taskApi
    .getAllTasksByUserId(req.params.userId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

taskRouter.get("/:taskId", (req, res) => {
  taskApi
    .getTaskById(req.params.taskId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

taskRouter.post("/", (req, res) => {
  req.body.userId = req.params.userId;
  req.body.dateTimeStarted = new Date();
  req.body.status = "Not Started";
  taskApi
    .createTask(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

taskRouter.put("/:taskId", (req, res) => {
  req.body.userId = req.params.userId;
  taskApi
    .editTask(req.params.taskId, req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

taskRouter.delete("/:taskId", (req, res) => {
  taskApi.deleteTask(req.params.taskId).then(data => {
    console.log(req.params.taskId);
    fileApi
      .deleteAllFilesForTask(req.params.taskId)
      .then(data2 => {
        res.json(data2);
      })
      .catch(err => {
        res.json(err);
      });
  });
});

module.exports = {
  taskRouter
};
