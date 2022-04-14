const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  messageIDValidationModel,
} = require("~/models/validationModels/chatValidationModels/messageIDValidationModel");

const messageIDValidation = {
  properties: { ...messageIDValidationModel.properties },

  info: {
    version: "1.0.0",
  },
};

const messageIDValidator = validatorCompiler(messageIDValidation.properties);

module.exports = { messageIDValidator, messageIDValidation };
