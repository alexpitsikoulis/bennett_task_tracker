const express = require("express");
const mailRouter = express.Router();
const nodemailer = require("nodemailer");
const creds = require("../config/nodemailerConfig");

var transport = {
  host: "smtp.gmail.com",
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

mailRouter.post("/newTask", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;

  var mail = {
    from: "Bennett Task Bot",
    to: email,
    subject: `You Have Been Assigned a New Task`,
    text: message
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: "fail"
      });
    } else {
      res.json({
        msg: "success"
      });
    }
  });
});

mailRouter.post("/updatedTask", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;

  var mail = {
    from: "Bennett Task Bot",
    to: email,
    subject: `One Of Your Tasks Has Been Updated`,
    text: message
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: "fail"
      });
    } else {
      res.json({
        msg: "success"
      });
    }
  });
});

mailRouter.post("/completedTask", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;

  var mail = {
    from: "Bennett Task Bot",
    to: email,
    subject: `A Task You Assigned Has Been Completed`,
    text: message
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: "fail"
      });
    } else {
      res.json({
        msg: "success"
      });
    }
  });
});

mailRouter.post("/reopenedTask", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;

  var mail = {
    from: "Bennett Task Bot",
    to: email,
    subject: `A Task Has Been Reopened`,
    text: message
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: "fail"
      });
    } else {
      res.json({
        msg: "success"
      });
    }
  });
});

mailRouter.post("/welcome", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;

  var mail = {
    from: "Bennett Task Bot",
    to: email,
    subject: `Welcome To The Bennett Task Tracker App`,
    text: message
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: "fail"
      });
    } else {
      res.json({
        msg: "success"
      });
    }
  });
});

mailRouter.post("/reminder", (req, res, next) => {
  var email = req.body.email;
  var message = req.body.message;

  var mail = {
    from: "Bennett Task Bot",
    to: email,
    subject: `Reminder: You Have Unfinished Tasks Due Today`,
    text: message
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: "fail"
      });
    } else {
      res.json({
        msg: "success"
      });
    }
  });
});

module.exports = { mailRouter };
