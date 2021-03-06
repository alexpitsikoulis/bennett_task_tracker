const express = require("express");
const User = require("../models/User");
const taskApi = require("../models/Task");
const fileApi = require("../models/File");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

userRouter.delete("/all", (req, res) => {
  User.deleteMany().then(users => {
    res.json(users);
  });
});

userRouter.get("/", (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.json(err);
    });
});

userRouter.get("/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});

userRouter.put("/:userId", (req, res) => {
  User.findByIdAndUpdate(req.params.userId, req.body)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});

userRouter.delete("/:userId", (req, res) => {
  User.findByIdAndDelete(req.params.userId).then(user => {
    taskApi.getAllTasksByUserId(user._id).then(tasks => {
      tasks.forEach(task => {
        fileApi.deleteAllFilesForTask(task._id).then(() => {
          taskApi
            .deleteAllTasksForUser(user._id)
            .then(() => {
              res.json(user);
            })
            .catch(err => {
              res.json(err);
            });
        });
      });
    });
  });
});

userRouter.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          } else {
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          }
        });
      });
    }
  });
});

userRouter.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ emailnotfound: "Email not found" });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926
          },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = { userRouter };
