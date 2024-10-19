const routes = require("express").Router();
const { userModel, threadModel } = require("./model");

routes.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });

  if (!user) {
    res.json({
      success: false,
      message: "Invalid username",
      data: {},
    });
  } else if (user.password !== password) {
    res.json({
      success: false,
      message: "Invalid password",
      data: {},
    });
  } else {
    const threadList = await threadModel.find({
      participants: { $in: [user] },
    });

    let tempThreadList = [];
    threadList.forEach((thread) => {
      const part = thread.participants.filter(
        (item) => item.username !== user.username
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
      data: { user, threadList: tempThreadList },
    });
  }
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
