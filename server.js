const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");
const { userRouter } = require("./controllers/User");
const { taskRouter } = require("./controllers/Task");
const { allTasksRouter } = require("./controllers/GetAllTasks");
const { mailRouter } = require("./controllers/Mail");
const taskApi = require("./models/Task");
const passport = require("passport");
const schedule = require("node-schedule");

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
app.use(express.static(`${__dirname}/client/build`));
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", userRouter);
app.use("/api/tasks", allTasksRouter);
app.use("/api/users/:userId/tasks", taskRouter);
app.use("/send", mailRouter);
app.get("/*", (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
