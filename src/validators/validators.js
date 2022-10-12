const { chatValidators } = require("@/validators/chat");
const { userValidators } = require("@/validators/user");

const validators = { ...chatValidators, ...userValidators };

module.exports = { validators };
