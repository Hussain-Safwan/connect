const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  username: String,
  password: String,
});

exports.userModel = mongoose.model("userSchema", userSchema);
