const axios = require("axios");

axios.get(`http://bennett-task-tracker.herokuapp.com/api/tasks`).then(tasks => {
  const unfinishedTasksDueToday = tasks.data.filter(task => {
    const year = new Date(task.dueDate).getFullYear();
    const month = new Date(task.dueDate).getMonth();
    const date = new Date(task.dueDate).getDate();
    const today = new Date(Date.now());

    return (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      date === today.getDate() &&
      task.status !== "Finished"
    );
  });

  unfinishedTasksDueToday.forEach(task => {
    const subject = `Reminder: You Have Unfinished Tasks Due Today`;
    const email = task.userEmail;
    const message = `Your task ${task.title} is due today and has not yet been marked completed.`;
    axios
      .post(`http://bennett-task-tracker.herokuapp.com/send`, {
        subject,
        email,
        message
      })
      .then(() => {
        console.log("message sent successfully");
      })
      .catch(err => {
        console.log(err);
      });
  });
});
