const {
  validationErrorBuilder,
} = require("utility-store/src/classes/ValidationErrorBuilder");

const { ValidationModelBuilder } = require("@/classes/ValidationModelBuilder");

const { errorThrower } = require("@/functions/utilities/utilities");

const {
  chatValidationModels: {
    chatIdValidationModel,
    participantIdValidationModel,
    messageIdValidationModel,
    messageTextValidationModel,
  },
} = require("@/models/validationModels/chatValidationModels");

const {
  chatErrors: {
    CHAT_ID_INVALID,
    CHAT_ID_INVALID_TYPE,
    CHAT_ID_MAX_LENGTH_REACH,
    CHAT_ID_MIN_LENGTH_REACH,
    CHAT_ID_REQUIRED,
    MESSAGE_ID_MIN_LENGTH_REACH,
    MESSAGE_TEXT_INVALID,
    MESSAGE_TEXT_INVALID_TYPE,
    MESSAGE_TEXT_MAX_LENGTH_REACH,
    MESSAGE_TEXT_REQUIRED,
    PARTICIPANT_ID_INVALID,
    PARTICIPANT_ID_INVALID_TYPE,
    PARTICIPANT_ID_MAX_LENGTH_REACH,
    PARTICIPANT_ID_MIN_LENGTH_REACH,
    PARTICIPANT_ID_REQUIRED,
  },
} = require("@/variables/errors/chatErrors");
const { trier } = require("utility-store/src/classes/Trier");

const compiledChatIdValidator = ValidationModelBuilder.validatorCompiler(
  chatIdValidationModel
);
const messageIdValidator = ValidationModelBuilder.validatorCompiler(
  messageIdValidationModel
);
const compiledMessageTextValidator = ValidationModelBuilder.validatorCompiler(
  messageTextValidationModel
);
const compiledParticipantIdValidator = ValidationModelBuilder.validatorCompiler(
  participantIdValidationModel
);

const tryToValidateChatId = async (chatId) => {
  const result = await compiledChatIdValidator({ chatId });

  if (result === true) return;

  validationErrorBuilder
    .create()
    .setRequirements(result, {
      extraErrorFields: {
        validatedChatId: chatId,
      },
    })
    .required(CHAT_ID_REQUIRED)
    .stringEmpty(CHAT_ID_REQUIRED)
    .string(CHAT_ID_INVALID_TYPE)
    .stringMin(CHAT_ID_MIN_LENGTH_REACH)
    .stringMax(CHAT_ID_MAX_LENGTH_REACH)
    .throwAnyway(CHAT_ID_INVALID)
    .execute();
};
const chatIdValidator = async (chatId) => {
  (
    await trier(chatIdValidator).tryAsync(tryToValidateChatId, chatId)
  ).printAndThrow();
};

const tryToValidateMessageText = async (messageText) => {
  const result = await compiledMessageTextValidator({ message: messageText });

  if (result === true) return;

  validationErrorBuilder
    .create()
    .setRequirements(result, {
      extraErrorFields: {
        validatedMessageText: messageText,
      },
    })
    .required(MESSAGE_TEXT_REQUIRED)
    .stringEmpty(MESSAGE_TEXT_REQUIRED)
    .string(MESSAGE_TEXT_INVALID_TYPE)
    .stringMin(MESSAGE_ID_MIN_LENGTH_REACH)
    .stringMax(MESSAGE_TEXT_MAX_LENGTH_REACH)
    .throwAnyway(MESSAGE_TEXT_INVALID)
    .execute();
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
  const result = await compiledParticipantIdValidator({
    participantId,
  });

  if (result === true) return;

  validationErrorBuilder
    .create()
    .setRequirements(result, {
      extraErrorFields: {
        validatedParticipantId: participantId,
      },
    })
    .required(PARTICIPANT_ID_REQUIRED)
    .stringEmpty(PARTICIPANT_ID_REQUIRED)
    .string(PARTICIPANT_ID_INVALID_TYPE)
    .stringMin(PARTICIPANT_ID_MIN_LENGTH_REACH)
    .stringMax(PARTICIPANT_ID_MAX_LENGTH_REACH)
    .throwAnyway(PARTICIPANT_ID_INVALID)
    .execute();
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
  messageIdValidator,
  messageTextValidator,
  participantIdValidator,
};

module.exports = { chatValidators };
