const { trier } = require("utility-store/src/classes/Trier");

const {
  compiledValidators: {
    compiledChatIdValidator,
    compiledMessageTextValidator,
    compiledParticipantIdValidator,
  },
} = require("@/validators/compiledValidators");

const {
  chatIdValidatorErrorBuilder,
  messageTextValidatorErrorBuilder,
  participantIdValidatorErrorBuilder,
} = require("@/validators/validatorErrorBuilders");

const tryToValidateChatId = async (chatId) => {
  const validationResult = await compiledChatIdValidator({ chatId });

  if (validationResult === true) return;
  chatIdValidatorErrorBuilder(validationResult, chatId);
};
const chatIdValidator = async (chatId) => {
  (
    await trier(chatIdValidator).tryAsync(tryToValidateChatId, chatId)
  ).printAndThrow();
};

const tryToValidateMessageText = async (messageText) => {
  const validationResult = await compiledMessageTextValidator({
    message: messageText,
  });

  if (validationResult === true) return;
  messageTextValidatorErrorBuilder(validationResult, messageText);
};

const messageTextValidator = async (messageText) => {
  (
    await trier(messageTextValidator.name).tryAsync(
      tryToValidateMessageText,
      messageText
    )
  ).printAndThrow();
};

const tryToValidateParticipantId = async (participantId) => {
  const validationResult = await compiledParticipantIdValidator({
    participantId,
  });

  if (validationResult === true) return;
  participantIdValidatorErrorBuilder(validationResult, participantId);
};

const participantIdValidator = async (participantId) => {
  (
    await trier(participantIdValidator.name).tryAsync(
      tryToValidateParticipantId,
      participantId
    )
  ).printAndThrow();
};

const chatValidators = {
  chatIdValidator,
  messageTextValidator,
  participantIdValidator,
};

module.exports = { chatValidators };
