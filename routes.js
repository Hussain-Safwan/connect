const routes = require("express").Router();
const passport = require("passport");
const { userModel, threadModel } = require("./model");
const session = require("express-session");
const localStrategy = require("passport-local");

routes.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);
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
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  const user = await userModel.findById(id);
  done(null, user);
});

routes.get("/user", isLoggedIn, async (req, res) => {
  const threadList = await threadModel.find({
    participants: { $in: [req.user] },
  });
  res.json({
    success: true,
    message: "User logged in",
    data: { user: req.user, threadList },
  });
});

routes.post("/login", passport.authenticate("local"), async (req, res) => {
  const threadList = await threadModel.find({
    participants: { $in: [req.user] },
  });

  let tempThreadList = [];
  threadList.forEach((thread) => {
    const part = thread.participants.filter(
      (item) => item.username !== req.user.username
    );
    thread.participants = part;
    tempThreadList.push(thread);
  });

  tempThreadList.sort((a, b) => {
    if (a.messages.length < 1) return 1;
    if (b.messages.length < 1) return -1;

    const date_a = a.messages[a.messages.length - 1].sendingTime;
    const date_b = b.messages[b.messages.length - 1].sendingTime;

    return date_b - date_a;
  });

  res.json({
    success: true,
    message: "Login successful",
    data: { user: req.user, threadList: tempThreadList },
  });
});

routes.post("/save", async (req, res) => {
  const { name, username, password } = req.body;

  const existingUser = await userModel.findOne({ username });
  if (existingUser) {
    res
      .status(404)
      .send({ success: false, message: "Username already taken", data: null });
  } else {
    const user = new userModel({ name, username, password });
    user.save();
    console.log("user saved");
    res
      .status(200)
      .send({ success: true, message: "Account created", data: user });
  }
});

routes.post("/thread", async (req, res) => {
  const { username, userId } = req.body;
  const currentUser = await userModel.findById(userId);
  const receiver = await userModel.findOne({ username });
  const thread = new threadModel({
    name: "",
    participants: [currentUser, receiver],
    messages: [],
  });

  await thread.save();

  thread.participants = thread.participants.filter(
    (item) => item._id !== currentUser._id
  );
  res.status(200).json({
    success: true,
    message: "Message sent to new thread",
    data: thread,
  });
});

routes.post("/group", async (req, res) => {
  const { thread, userId } = req.body;
  const currentUser = await userModel.findById(userId);

  const newThread = new threadModel({
    name: thread.name,
    owner: currentUser,
    participants: [...thread.participants, currentUser],
    messages: [],
  });

  await newThread.save();

  newThread.participants = newThread.participants.filter(
    (item) => item._id !== currentUser._id
  );
  res.status(200).json({
    success: true,
    message: "Message sent to new thread",
    data: newThread,
  });
});

routes.put("/group", async (req, res) => {
  const { thread, userId } = req.body;
  const { groupId, participants } = thread;
  const currentUser = await userModel.findById(userId);
  const group = await threadModel.findById(groupId);
  participants.push(currentUser);
  group.participants = participants;

  await group.save();

  group.participants = group.participants.filter(
    (item) => item._id !== currentUser._id
  );

  res.status(200).json({
    success: true,
    message: "Message sent to new thread",
    data: group,
  });
});

routes.post("/send-message", async (req, res) => {
  const { threadId, userId, content } = req.body;
  const thread = await threadModel.findById(threadId);
  const currentUser = await userModel.findById(userId);

  thread.messages.push({
    sender: currentUser,
    content,
  });

  await thread.save();

  thread.participants = thread.participants.filter(
    (item) => item.username !== currentUser.username
  );
  res.status(200).json({
    success: true,
    message: "Message sent to current thread",
    data: thread,
  });
});

routes.get("/leave/:groupId/:username", async (req, res) => {
  const { groupId, username } = req.params;
  const group = await threadModel.findById(groupId);
  console.log(groupId, username);

  group.participants = group.participants.filter(
    (item) => item.username !== username
  );
  await group.save();

  res.status(200).json({
    success: true,
    message: "Group left",
    data: {},
  });
});

module.exports = routes;
