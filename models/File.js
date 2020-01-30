const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  title: String,
  image: String,
  imageId: String,
  taskId: String
});

const FileCollection = mongoose.model("File", FileSchema);

module.exports = FileCollection;
