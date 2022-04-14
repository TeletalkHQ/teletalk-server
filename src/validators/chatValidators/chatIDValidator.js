const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  chatIdValidationModel: chatIDValidationModel,
} = require("~/models/validationModels/chatValidationModels/chatIdValidationModel");

const chatIDValidation = {
  properties: { ...chatIDValidationModel.properties },

  info: {
    version: "1.0.0",
  },
};

const chatIDValidator = validatorCompiler(chatIDValidation.properties);

module.exports = { chatIDValidator, chatIDValidation };
