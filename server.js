require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const axios = require("axios");
const { userRouter } = require("./controllers/User");
const { taskRouter } = require("./controllers/Task");
const { allTasksRouter } = require("./controllers/GetAllTasks");
const { mailRouter } = require("./controllers/Mail");
const { fileRouter } = require("./controllers/File");
const passport = require("passport");
// const schedule = require("node-schedule");

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
app.use("/api/files", fileRouter);
app.use("/api/users", userRouter);
app.use("/api/tasks", allTasksRouter);
app.use("/api/users/:userId/tasks", taskRouter);
app.use("/send", mailRouter);
app.get("/*", (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

const PORT = process.env.PORT || 3001;

// schedule.scheduleJob("0 8 * * *", () => {
//   axios.get(`http://localhost:${PORT}/api/tasks`).then(tasks => {
//     const unfinishedTasksDueToday = tasks.data.filter(task => {
//       const year = new Date(task.dueDate).getFullYear();
//       const month = new Date(task.dueDate).getMonth();
//       const date = new Date(task.dueDate).getDate();
//       const today = new Date(Date.now());

//       return (
//         year === today.getFullYear() &&
//         month === today.getMonth() &&
//         date === today.getDate() &&
//         task.status !== "Finished"
//       );
//     });

//     unfinishedTasksDueToday.forEach(task => {
//       const subject = `Reminder: You Have Unfinished Tasks Due Today`;
//       const email = task.userEmail;
//       const message = `Your task ${task.title} is due today and has not yet been marked completed.`;
//       axios
//         .post(`http://localhost:${PORT}/send`, {
//           subject,
//           email,
//           message
//         })
//         .then(() => {
//           console.log("message sent successfully");
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     });
//   });
// });

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
