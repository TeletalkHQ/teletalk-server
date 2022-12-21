const { trier } = require("utility-store/src/classes/Trier");

const { compiledValidators } = require("@/validators/compiledValidators");

const { validatorErrorChecker } = require("@/validators/validatorErrorChecker");

const tryToValidateChatId = async (chatId) => {
  const validationResult = await compiledValidators.chatId({ chatId });

  if (validationResult === true) return;
  validatorErrorChecker.chatId(validationResult, chatId);
};
const chatId = async (chatIdParam) => {
  await trier(chatId)
    .tryAsync(tryToValidateChatId, chatIdParam)
    .throw()
    .runAsync();
};

const tryToValidateMessageText = async (messageText) => {
  const validationResult = await compiledValidators.messageText({
    message: messageText,
  });

  if (validationResult === true) return;
  validatorErrorChecker.messageText(validationResult, messageText);
};

const messageText = async (messageTextParam) => {
  await trier(messageText.name)
    .tryAsync(tryToValidateMessageText, messageTextParam)
    .throw()
    .runAsync();
};

const tryToValidateParticipantId = async (participantId) => {
  const validationResult = await compiledValidators.participantId({
    participantId,
  });

  if (validationResult === true) return;
  validatorErrorChecker.participantId(validationResult, participantId);
};

const participantId = async (participantIdParam) => {
  await trier(participantId.name)
    .tryAsync(tryToValidateParticipantId, participantIdParam)
    .throw()
    .runAsync();
};

const chatValidators = {
  chatId,
  messageText,
  participantId,
};

module.exports = { chatValidators };
