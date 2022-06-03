const {
  errorThrower,
  getValidatorErrorTypes,
  getErrorObject,
} = require("@/functions/utilities/utils");
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

const compiledChatIdValidator = validatorCompiler(chatIdValidationModel);
const messageIdValidator = validatorCompiler(messageIdValidationModel);
const compiledMessageTextValidator = validatorCompiler(
  messageTextValidationModel
);
const compiledParticipantIdValidator = validatorCompiler(
  participantIdValidationModel
);

const chatIdValidator = async (chatId, returnCondition) => {
  try {
    const result = await compiledChatIdValidator({ chatId });

    if (result === true) return { done: true };

    const { required, string, stringEmpty, stringMax, stringMin } =
      getValidatorErrorTypes(result);

    const errorObject = (errorObject) =>
      getErrorObject(errorObject, {
        validatedChatId: chatId,
        validationResult: result,
      });

    errorThrower(stringEmpty || required, () => errorObject(CHAT_ID_REQUIRED));

    errorThrower(string, () => errorObject(CHAT_ID_INVALID_TYPE));

    errorThrower(stringMin, () => errorObject(CHAT_ID_MIN_LENGTH_REACH));

    errorThrower(stringMax, () => errorObject(CHAT_ID_MAX_LENGTH_REACH));

    errorThrower(result !== true, errorObject(CHAT_ID_INVALID));
  } catch (error) {
    logger.log("chatIdValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const messageTextValidator = async (messageText, returnCondition) => {
  try {
    const result = await compiledMessageTextValidator({ message: messageText });

    if (result === true) return { done: true };

    const errorObject = (errorObject) =>
      getErrorObject(errorObject, {
        validatedMessageText: messageText,
        validationResult: result,
      });

    const { required, string, stringEmpty, stringMax, stringMin } =
      getValidatorErrorTypes(result);

    errorThrower(stringEmpty || required, () =>
      errorObject(MESSAGE_TEXT_REQUIRED)
    );

    errorThrower(string, () => errorObject(MESSAGE_TEXT_INVALID_TYPE));

    errorThrower(stringMin, () => errorObject(MESSAGE_ID_MIN_LENGTH_REACH));

    errorThrower(stringMax, () => errorObject(MESSAGE_TEXT_MAX_LENGTH_REACH));

    errorThrower(result !== true, errorObject(MESSAGE_TEXT_INVALID));
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

    const { required, string, stringEmpty, stringMax, stringMin } =
      getValidatorErrorTypes(result);

    const errorObject = (errorObject) =>
      getErrorObject(errorObject, {
        validatedParticipantId: participantId,
        validationResult: result,
      });

    errorThrower(stringEmpty || required, () =>
      errorObject(PARTICIPANT_ID_REQUIRED)
    );

    errorThrower(string, () => errorObject(PARTICIPANT_ID_INVALID_TYPE));

    errorThrower(stringMin, () => errorObject(PARTICIPANT_ID_MIN_LENGTH_REACH));

    errorThrower(stringMax, () => errorObject(PARTICIPANT_ID_MAX_LENGTH_REACH));

    errorThrower(result !== true, errorObject(PARTICIPANT_ID_INVALID));
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
