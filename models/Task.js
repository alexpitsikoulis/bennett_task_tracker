const mongoose = require("./connection");

const TaskSchema = new mongoose.Schema({
  title: String,
  priority: String,
  estimatedHours: Number,
  description: String,
  status: String,
  userId: mongoose.Types.ObjectId,
  dateTimeStarted: Date,
  dueDate: Date,
  assignedBy: String,
  assignedById: mongoose.Types.ObjectId
});

const TaskCollection = mongoose.model("Task", TaskSchema);

function getAllTasksByUserId(userId) {
  return TaskCollection.find({ userId: userId });
}

function getTaskById(taskId) {
  return TaskCollection.findById(taskId);
}

function createTask(taskObject) {
  return TaskCollection.create(taskObject);
}

function editTask(taskId, taskObject) {
  return TaskCollection.findByIdAndUpdate(taskId, taskObject, { new: true });
}

function deleteTask(taskId) {
  return TaskCollection.findByIdAndDelete(taskId);
}

module.exports = {
  getAllTasksByUserId,
  getTaskById,
  createTask,
  editTask,
  deleteTask
};
