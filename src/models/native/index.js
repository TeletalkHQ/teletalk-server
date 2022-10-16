const { chat } = require("@/models/native/chat");
const { common } = require("@/models/native/common");
const { user } = require("@/models/native/user");

const nativeModels = {
  chat,
  common,
  user,
};

module.exports = { nativeModels };
