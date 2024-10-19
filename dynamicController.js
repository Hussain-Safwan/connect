const { userModel, threadModel } = require("./model");

const genHexString = (len) => {
  const hex = "0123456789abcdef";
  let output = "";
  for (let i = 0; i < len; ++i) {
    output += hex.charAt(Math.floor(Math.random() * hex.length));
  }
  return output;
};

module.exports.sendMessage = async (message) => {
  const { threadId, userId, content } = message;
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

  return {
    success: true,
    message: "New message!",
    data: thread,
  };
};

module.exports.addThread = async (body) => {
  console.log(body);
  const { username, userId } = body;
  const currentUser = await userModel.findById(userId);
  const receiver = await userModel.findOne({ username });

  if (receiver) {
    const thread = new threadModel({
      name: "",
      participants: [currentUser, receiver],
      messages: [],
    });

    await thread.save();
    return {
      success: true,
      message: "New contact added",
      data: thread,
    };
  } else {
    const group = await threadModel.findOne({ token: username });
    if (group) {
      group.participants.push(currentUser);
      group.save();

      return {
        success: true,
        message: "Joined new group",
        data: group,
      };
    } else {
      return {
        success: false,
        message: "No contact or group found",
        data: {},
      };
    }
  }
};

module.exports.addGroup = async (req) => {
  const { thread, userId } = req;
  const currentUser = await userModel.findById(userId);

  const newThread = new threadModel({
    name: thread.name,
    token: genHexString(6),
    owner: currentUser,
    participants: [...thread.participants, currentUser],
    messages: [],
  });

  await newThread.save();

  return {
    success: true,
    message: "New group created",
    data: newThread,
  };
};
