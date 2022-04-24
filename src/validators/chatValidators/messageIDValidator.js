const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  messageIdValidationModel: { properties: messageIdValidationModel },
} = require("~/models/validationModels/chatValidationModels/messageIdValidationModel");

const messageIDValidation = {
  properties: messageIdValidationModel,

  info: {
    version: "1.0.0",
  },
};

const messageIDValidator = validatorCompiler(messageIDValidation.properties);

module.exports = { messageIDValidator, messageIDValidation };
