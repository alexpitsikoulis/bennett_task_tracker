const express = require("express");
const taskApi = require("../models/Task");
const allTasksRouter = express.Router();

allTasksRouter.get("/", (req, res) => {
  taskApi
    .getAllTasks()
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => {
      res.json(err);
    });
});

allTasksRouter.get("/assignedBy/:assignedById", (req, res) => {
  taskApi
    .getAllTasksByAssignedById(req.params.assignedById)
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => {
      res.json(err);
    });
});

allTasksRouter.get("/:taskId", (req, res) => {
  taskApi
    .getTaskById(req.params.taskId)
    .then(task => {
      res.json(task);
    })
    .catch(err => {
      res.json(err);
    });
});

allTasksRouter.delete("/all", (req, res) => {
  taskApi
    .deleteAllTasks()
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = { allTasksRouter };
