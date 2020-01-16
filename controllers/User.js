const express = require("express");
const userApi = require("../models/User");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  userApi
    .getAllUsers()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

userRouter.get("/:userId", (req, res) => {
  userApi
    .getUserById(req.params.userId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

userRouter.post("/", (req, res) => {
  userApi
    .createUser(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

userRouter.put("/:userId", (req, res) => {
  userApi
    .editUser(req.params.userId, req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

userRouter.delete("/:userId", (req, res) => {
  userApi
    .deleteUser(req.params.userId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = {
  userRouter
};
