const {
  validatorCompiler,
} = require("@/functions/utilities/validatorCompiler");

const {
  chatValidationModels: {
    chatIdValidationModel,
    participantIdValidationModel,
    messageIdValidationModel,
    messageTextValidationModel,
  },
} = require("@/models/validationModels/chatValidationModels");

const chatIdValidator = validatorCompiler(chatIdValidationModel);

const messageIdValidator = validatorCompiler(messageIdValidationModel);

const messageTextValidator = validatorCompiler(messageTextValidationModel);

const participantIdValidator = validatorCompiler(participantIdValidationModel);

const chatValidators = {
  chatIdValidator,
  messageTextValidator,
  participantIdValidator,
  messageIdValidator,
};

module.exports = { chatValidators };
