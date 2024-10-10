const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.send("hello");
});

routes.post("/save", (req, res) => {
  const { userModel } = require("./model");
  const { name, phone, username, password } = req.body;
  const user = new userModel({ name, phone, username, password });
  user.save();
  console.log("user saved");
  res.send("User saved!");
});

module.exports = routes;
