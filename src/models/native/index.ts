const { chatModels } = require("@/models/native/chat");
const { commonModels } = require("@/models/native/common");
const { userModels } = require("@/models/native/user");

const nativeModels = {
  chat: chatModels,
  common: commonModels,
  user: userModels,
};

module.exports = { nativeModels };
