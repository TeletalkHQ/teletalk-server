const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  chatIDValidationModel,
} = require("~/models/validationModels/chatValidationModels/chatIDValidationModel");

const chatIDValidation = {
  properties: { ...chatIDValidationModel.properties },

  info: {
    version: "1.0.0",
  },
};

const chatIDValidator = validatorCompiler(chatIDValidation.properties);

module.exports = { chatIDValidator, chatIDValidation };
