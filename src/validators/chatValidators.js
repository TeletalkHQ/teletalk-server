const { validationErrorBuilder } = require("@/classes/Builders");
const { ValidationModelBuilder } = require("@/classes/ValidationModelBuilder");

const { errorThrower } = require("@/functions/utilities/utils");

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

const checkReturnCondition = (returnCondition, error) => {
  if (returnCondition) {
    return error;
  }

  errorThrower(error, error);
};

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

const chatIdValidator = async (chatId, returnCondition) => {
  try {
    const result = await compiledChatIdValidator({ chatId });

    if (result === true) return { done: true };

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
  } catch (error) {
    logger.log("chatIdValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const messageTextValidator = async (messageText, returnCondition) => {
  try {
    const result = await compiledMessageTextValidator({ message: messageText });

    if (result === true) return { done: true };

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
  } catch (error) {
    logger.log("messageTextValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const participantIdValidator = async (participantId, returnCondition) => {
  try {
    const result = await compiledParticipantIdValidator({
      participantId,
    });

    if (result === true) return { done: true };

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
  } catch (error) {
    logger.log("privateIdValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const chatValidators = {
  chatIdValidator,
  messageTextValidator,
  participantIdValidator,
  messageIdValidator,
};

module.exports = { chatValidators };
