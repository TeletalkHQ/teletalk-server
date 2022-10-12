const { trier } = require("utility-store/src/classes/Trier");

const { compiledValidators } = require("@/validators/compiledValidators");

const {
  validatorErrorBuilder,
} = require("@/validators/validatorErrorBuilders");

const tryToValidateChatId = async (chatId) => {
  const validationResult = await compiledValidators.chatId({ chatId });

  if (validationResult === true) return;
  validatorErrorBuilder.chatId(validationResult, chatId);
};
const chatId = async (chatIdParam) => {
  (
    await trier(chatId).tryAsync(tryToValidateChatId, chatIdParam)
  ).printAndThrow();
};

const tryToValidateMessageText = async (messageText) => {
  const validationResult = await compiledValidators.messageText({
    message: messageText,
  });

  if (validationResult === true) return;
  validatorErrorBuilder.messageText(validationResult, messageText);
};

const messageText = async (messageTextParam) => {
  (
    await trier(messageText.name).tryAsync(
      tryToValidateMessageText,
      messageTextParam
    )
  ).printAndThrow();
};

const tryToValidateParticipantId = async (participantId) => {
  const validationResult = await compiledValidators.participantId({
    participantId,
  });

  if (validationResult === true) return;
  validatorErrorBuilder.participantId(validationResult, participantId);
};

const participantId = async (participantIdParam) => {
  (
    await trier(participantId.name).tryAsync(
      tryToValidateParticipantId,
      participantIdParam
    )
  ).printAndThrow();
};

const chatValidators = {
  chatId,
  messageText,
  participantId,
};

module.exports = { chatValidators };
