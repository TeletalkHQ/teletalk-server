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
