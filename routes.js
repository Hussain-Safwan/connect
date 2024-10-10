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
  done(null, user.id);
});

passport.deserializeUser(function (user, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

routes.get("/", (req, res) => {
  res.send("hello");
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
