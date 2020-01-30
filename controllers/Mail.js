const express = require("express");
const mailRouter = express.Router();
const nodemailer = require("nodemailer");

var transport = {
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
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

mailRouter.post("/", (req, res, next) => {
  var email = req.body.email;
  var message = req.body.message;
  var subject = req.body.subject;

  var mail = {
    from: "Bennett Task Bot",
    to: email,
    subject: subject,
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
