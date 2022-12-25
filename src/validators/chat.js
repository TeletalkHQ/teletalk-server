const { compiledValidators } = require("@/validators/compiledValidators");

const { validatorErrorChecker } = require("@/validators/validatorErrorChecker");

const chatIdValidator = async (chatId) => {
  const validationResult = await compiledValidators.chatId({ chatId });

  if (validationResult === true) return;
  validatorErrorChecker.chatId(validationResult, chatId);
};

const messageTextValidator = async (messageText) => {
  const validationResult = await compiledValidators.messageText({
    message: messageText,
  });

  if (validationResult === true) return;
  validatorErrorChecker.messageText(validationResult, messageText);
};

const participantIdValidator = async (participantId) => {
  const validationResult = await compiledValidators.participantId({
    participantId,
  });

  if (validationResult === true) return;
  validatorErrorChecker.participantId(validationResult, participantId);
};

const chatValidators = {
  chatId: chatIdValidator,
  messageText: messageTextValidator,
  participantId: participantIdValidator,
};

module.exports = { chatValidators };
