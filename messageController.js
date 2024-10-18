const { userModel, threadModel } = require("./model");

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

  return;
};
