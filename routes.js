const routes = require("express").Router();
const passport = require("passport");
const { userModel } = require("./model");
const session = require("express-session");
const localStrategy = require("passport-local");

routes.use(session({ secret: "very-secret!" }));
routes.use(passport.initialize());
routes.use(passport.session());

passport.use(
  new localStrategy(async function verify(username, password, done) {
    const user = await userModel.findOne({ username });
    if (!user) {
      return done(null, false, "No such user find");
    } else if (user.password != password) {
      return done(null, false, "Incorrect password");
    } else {
      return done(null, user);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (user, done) {
  const foundUser = await userModel.findById(user._id);
  done(foundUser);
});

routes.get("/", (req, res) => {
  console.log(req.user.name);
  res.send(req.user);
});

routes.post("/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

routes.post("/save", (req, res) => {
  const { name, phone, username, password } = req.body;
  const user = new userModel({ name, phone, username, password });
  user.save();
  console.log("user saved");
  res.status(200).send({ success: true, data: user });
});

module.exports = routes;
