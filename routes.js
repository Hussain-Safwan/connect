const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.send("hello");
});

routes.post("/save", (req, res) => {
  const { userModel } = require("./model");
  const user = new userModel({
    name: "safwan",
    phone: "017718164366",
    username: "hussain-safwan",
    password: "**997**",
  });
  user.save();
  console.log("saved");
  res.send("User saved!");
});

module.exports = routes;
