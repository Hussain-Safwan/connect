const routes = require("express").Router();
const passport = require("passport");
const { userModel } = require("./model");
const session = require("express-session");
const localStrategy = require("passport-local");

routes.use(session({ secret: "very-secret!" }));
routes.use(passport.initialize());
routes.use(passport.session());

const isLoggedIn = (req, res, done) => {
  if (req.user) return done();
  res.json(null);
};

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
  done(null, user);
});

routes.get("/", isLoggedIn, (req, res) => {
  res.json(req.user);
});

routes.post("/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

routes.post("/save", async (req, res) => {
  const { name, phone, username, password } = req.body;

  const existingUser = await userModel.findOne({ username });
  if (existingUser) {
    res
      .status(404)
      .send({ success: false, message: "Username already taken", data: null });
  } else {
    const user = new userModel({ name, phone, username, password });
    user.save();
    console.log("user saved");
    res
      .status(200)
      .send({ success: true, message: "Account created", data: user });
  }
});

module.exports = routes;