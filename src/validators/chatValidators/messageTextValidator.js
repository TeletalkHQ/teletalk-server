const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  messageTextValidationModel: { properties: messageTextValidationModel },
} = require("~/models/validationModels/chatValidationModels/messageTextValidationModel");

const messageTextValidation = {
  properties: messageTextValidationModel,

  info: {
    version: "1.0.0",
  },
};

const messageTextValidator = validatorCompiler(
  messageTextValidation.properties
);

module.exports = { messageTextValidator, messageTextValidation };
