const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  username: String,
  password: String,
});

const threadSchema = new mongoose.Schema({
  name: String,
  participantIds: [String],
  messages: [
    {
      sender: {
        name: String,
        phone: String,
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
