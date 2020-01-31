const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  title: String,
  file: String,
  fileId: String,
  taskId: String
});

const FileCollection = mongoose.model("File", FileSchema);

function getAllFiles() {
  return FileCollection.find();
}

function getFilesByTaskId(taskId) {
  return FileCollection.find({ taskId });
}

function getFileById(fileId) {
  return FileCollection.findById(fileId);
}

function createFile(fileObject) {
  return FileCollection.create(fileObject);
}

function deleteFile(fileId) {
  return FileCollection.findByIdAndDelete(fileId);
}

function deleteAllFiles() {
  return FileCollection.deleteMany();
}

module.exports = {
  getAllFiles,
  getFilesByTaskId,
  getFileById,
  createFile,
  deleteFile,
  deleteAllFiles
};
