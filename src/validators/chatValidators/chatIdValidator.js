const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  chatIdValidationModel: { properties: chatIdValidationModel },
} = require("~/models/validationModels/chatValidationModels/chatIdValidationModel");

const chatIDValidation = {
  properties: chatIdValidationModel,

  info: {
    version: "1.0.0",
  },
};

const chatIDValidator = validatorCompiler(chatIDValidation.properties);

module.exports = { chatIDValidator, chatIDValidation };
