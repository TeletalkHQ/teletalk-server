import { compiledValidators } from "@/helpers/compiledValidators";
import { validationChecker } from "@/helpers/validationChecker";

const chatIdValidator = async (chatId: unknown) => {
  const validationResult = await compiledValidators.chatId(chatId);
  validationChecker.chatId(validationResult, chatId);
};

const messageTextValidator = async (messageText: unknown) => {
  const validationResult = await compiledValidators.messageText(messageText);
  validationChecker.message(validationResult, messageText);
};

const participantIdValidator = async (participantId: unknown) => {
  const validationResult = await compiledValidators.participantId(
    participantId
  );
  validationChecker.participantId(validationResult, participantId);
};

const chatValidators = {
  chatId: chatIdValidator,
  messageText: messageTextValidator,
  participantId: participantIdValidator,
};

export { chatValidators };
