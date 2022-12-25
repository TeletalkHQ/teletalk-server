const { chatValidationModels } = require("@/models/validation/chat");
const { commonValidationModels } = require("@/models/validation/common");
const { userValidationModels } = require("@/models/validation/user");

const validationModels = {
  chat: chatValidationModels,
  common: commonValidationModels,
  user: userValidationModels,
};

module.exports = { validationModels };
