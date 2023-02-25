import { compiledValidators } from "@/validators/compiledValidators";

import { validatorErrorChecker } from "@/validators/validatorErrorChecker";

const chatIdValidator = async (chatId) => {
  const validationResult = await compiledValidators.chatId({ chatId });
  validatorErrorChecker.chatId(validationResult, chatId);
};

const messageTextValidator = async (messageText) => {
  const validationResult = await compiledValidators.messageText({
    message: messageText,
  });
  validatorErrorChecker.message(validationResult, messageText);
};

const participantIdValidator = async (participantId) => {
  const validationResult = await compiledValidators.participantId({
    participantId,
  });
  validatorErrorChecker.participantId(validationResult, participantId);
};

const chatValidators = {
  chatId: chatIdValidator,
  messageText: messageTextValidator,
  participantId: participantIdValidator,
};

export { chatValidators };
