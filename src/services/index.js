const { chatServices } = require("@/services/chat");
const { commonServices } = require("@/services/common");
const { userServices } = require("@/services/user");

const services = {
  ...chatServices,
  ...commonServices,
  ...userServices,
};

module.exports = { services };
