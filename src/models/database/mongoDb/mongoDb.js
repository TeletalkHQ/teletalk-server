const { PrivateChat } = require("@/models/database/mongoDb/privateChat");
const { User } = require("@/models/database/mongoDb/user");

const mongoDb = {
  PrivateChat,
  User,
};

module.exports = { mongoDb };
