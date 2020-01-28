const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { userRouter } = require("./controllers/User");
const { taskRouter } = require("./controllers/Task");
const { allTasksRouter } = require("./controllers/GetAllTasks");
const nodemailer = require("nodemailer");
const passport = require("passport");
const creds = require("./config/nodemailerConfig");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(express.static(`${__dirname}/client/build`));
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", userRouter);
app.use("/api/tasks", allTasksRouter);
app.use("/api/users/:userId/tasks", taskRouter);
app.get("/*", (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

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

app.post("/send/newTask", (req, res, next) => {
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

app.post("/send/updatedTask", (req, res, next) => {
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

app.post("/send/completedTask", (req, res, next) => {
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

app.post("/send/reopenedTask", (req, res, next) => {
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

app.post("/send/welcome", (req, res, next) => {
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
