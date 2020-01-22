const mongoose = require("./connection.js");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  image: String
});

const UserCollection = mongoose.model("User", UserSchema);

function getAllUsers() {
  return UserCollection.find();
}

function getUserById(userId) {
  return UserCollection.findById(userId);
}

function createUser(userObject) {
  return UserCollection.create(userObject);
}

function editUser(userId, userObject) {
  return UserCollection.findByIdAndUpdate(userId, userObject, { new: true });
}

function deleteUser(userId) {
  return UserCollection.findByIdAndDelete(userId);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser
};
