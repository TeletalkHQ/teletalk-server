const {
  validatorCompiler,
} = require("@/functions/utilities/validatorCompiler");

const {
  chatValidationModels: {
    properties: {
      chatIdValidationModel: { properties: chatIdValidationModel },
      participantIdValidationModel: {
        properties: participantIdValidationModel,
      },
      messageIdValidationModel: { properties: messageIdValidationModel },
      messageTextValidationModel: { properties: messageTextValidationModel },
    },
  },
} = require("@/models/validationModels/chatValidationModels");

const chatIdValidator = validatorCompiler(chatIdValidationModel);

const messageIDValidator = validatorCompiler(messageIdValidationModel);

const messageTextValidator = validatorCompiler(messageTextValidationModel);

const participantIDValidator = validatorCompiler(participantIdValidationModel);

const chatValidators = {
  chatIdValidator,
  messageTextValidator,
  participantIDValidator,
  messageIDValidator,
};

module.exports = { chatValidators };
