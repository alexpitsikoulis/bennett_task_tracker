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

schedule.scheduleJob("0 8 * * *", () => {
  axios
    .get(`http://localhost:${PORT}/api/tasks/`)
    .then(res => {
      const dueToday = res.data.filter(task => {
        const dueDate = new Date(task.dueDate);
        const today = new Date(Date.now());
        return (
          dueDate.getFullYear() === today.getFullYear() &&
          dueDate.getMonth() === today.getMonth() &&
          dueDate.getDate() === today.getDate() &&
          task.status !== "Finished"
        );
      });
      dueToday.forEach(task => {
        const email = task.userEmail;
        const message = `Your task ${task.title} has not been completed and is due today!`;

        axios.post("http://localhost:3001/send/reminder", { email, message });
      });
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
