const { User } = require("@/models/database/mongoDb/user");
const { PrivateChat } = require("@/models/database/mongoDb/privateChat");

const testServer = async () => {
  await deleteAllUsers();
  await deleteAllPrivateChats();
};

const deleteAllUsers = async () => {
  await User.deleteMany();
};

const deleteAllPrivateChats = async () => {
  await PrivateChat.deleteMany();
};

module.exports = { testServer };
