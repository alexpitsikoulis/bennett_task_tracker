const userApi = require("./User");
const taskApi = require("./Task");

taskApi.deleteAllTasks().then(() => {
  userApi.deleteMany().then(() => {
    console.log("Done !");
  });
});
