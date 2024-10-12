const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
});

const threadSchema = new mongoose.Schema({
  name: String,
  participants: [
    {
      name: String,
      username: String,
      password: String,
    },
  ],
  messages: [
    {
      sender: {
        name: String,
        username: String,
        password: String,
      },
      content: String,
      sendingTime: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

exports.userModel = mongoose.model("userSchema", userSchema);
exports.threadModel = mongoose.model("threadSchema", threadSchema);
