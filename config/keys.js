module.exports = {
  mongoURI:
    process.env.MONGODB_URI || "mongodb://localhost/bennett-task-tracker",
  secretOrKey: "secret"
};
