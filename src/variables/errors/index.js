const { appErrors } = require("@/variables/errors/server");
const { chatErrors } = require("@/variables/errors/chat");
const { localErrors } = require("@/variables/errors/local");
const { userErrors } = require("@/variables/errors/user");

const errors = {
  ...appErrors,
  ...chatErrors,
  ...localErrors,
  ...userErrors,
};

module.exports = { errors };
