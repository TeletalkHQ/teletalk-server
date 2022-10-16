const { chat } = require("@/models/validation/chat");
const { common } = require("@/models/validation/common");
const { user } = require("@/models/validation/user");

const validation = {
  chat,
  common,
  user,
};

module.exports = { validation };
