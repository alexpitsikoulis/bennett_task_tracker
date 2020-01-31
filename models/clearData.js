const userApi = require("./User");
const taskApi = require("./Task");
const fileApi = require("./File");

taskApi.deleteAllTasks().then(() => {
  userApi.deleteMany().then(() => {
    fileApi.deleteAllFiles().then(() => {
      console.log("done!");
    });
  });
});
