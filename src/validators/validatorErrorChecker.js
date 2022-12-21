const {
  validationErrorBuilder,
} = require("utility-store/src/classes/ValidationErrorBuilder");

const { errors } = require("@/variables/errors");

const { countries } = require("@/variables/others/countries");

const countryCodeErrorChecker = (validationResult, countryCode) => {
  const errorBuilder = validationErrorBuilder.create();

  errorBuilder
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedCountryCode: countryCode,
      },
    })
    .customCheck(validationResult === true, () => {
      const country = countries.find((c) => c.countryCode === countryCode);

      errorBuilder.addError(
        country === undefined,
        errors.COUNTRY_CODE_NOT_SUPPORTED
      );
    })
    .stringEmpty(errors.COUNTRY_CODE_REQUIRED)
    .required(errors.COUNTRY_CODE_REQUIRED)
    .string(errors.COUNTRY_CODE_INVALID_TYPE)
    .stringNumeric(errors.COUNTRY_CODE_NUMERIC)
    .stringMin(errors.COUNTRY_CODE_MINLENGTH_REACH)
    .stringMax(errors.COUNTRY_CODE_MAXLENGTH_REACH)
    .throwAnyway(errors.COUNTRY_CODE_INVALID)
    .execute();
};

const countryNameErrorChecker = (validationResult, countryName) => {
  const errorBuilder = validationErrorBuilder.create();

  errorBuilder
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedCountryName: countryName,
      },
    })
    .customCheck(validationResult === true, () => {
      const country = countries.find((c) => c.countryName === countryName);

      errorBuilder.addError(
        country === undefined,
        errors.COUNTRY_NAME_NOT_SUPPORTED
      );
    })
    .required(errors.COUNTRY_NAME_REQUIRED)
    .stringEmpty(errors.COUNTRY_NAME_REQUIRED)
    .string(errors.COUNTRY_NAME_INVALID_TYPE)
    .stringMax(errors.COUNTRY_NAME_MAXLENGTH_REACH)
    .stringMin(errors.COUNTRY_NAME_MINLENGTH_REACH)
    .throwAnyway(errors.COUNTRY_NAME_INVALID)
    .execute();
};

const firstNameErrorChecker = (validationResult, firstName) => {
  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedFirstName: firstName,
      },
    })
    .required(errors.FIRST_NAME_REQUIRED)
    .stringEmpty(errors.FIRST_NAME_REQUIRED)
    .string(errors.FIRST_NAME_INVALID_TYPE)
    .stringMin(errors.FIRST_NAME_MINLENGTH_REACH)
    .stringMax(errors.FIRST_NAME_MAXLENGTH_REACH)
    .execute();
};

const lastNameErrorChecker = (validationResult, lastName) => {
  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: { validatedLastName: lastName },
    })
    .string(errors.LAST_NAME_INVALID_TYPE)
    .stringMin(errors.LAST_NAME_MINLENGTH_REACH)
    .stringMax(errors.LAST_NAME_MAXLENGTH_REACH)
    .throwAnyway(errors.LAST_NAME_INVALID)
    .execute();
};

const phoneNumberErrorChecker = (validationResult, phoneNumber) => {
  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedPhoneNumber: phoneNumber,
      },
    })
    .required(errors.PHONE_NUMBER_REQUIRED)
    .stringEmpty(errors.PHONE_NUMBER_REQUIRED)
    .string(errors.PHONE_NUMBER_INVALID_TYPE)
    .stringMax(errors.PHONE_NUMBER_MAXLENGTH_REACH)
    .stringMin(errors.PHONE_NUMBER_MINLENGTH_REACH)
    .stringNumeric(errors.PHONE_NUMBER_NUMERIC)
    .throwAnyway(errors.PHONE_NUMBER_INVALID)
    .execute();
};

const userIdErrorChecker = (validationResult, userId) => {
  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedUserId: userId,
      },
    })
    .required(errors.USER_ID_REQUIRED)
    .stringEmpty(errors.USER_ID_REQUIRED)
    .string(errors.USER_ID_INVALID_TYPE)
    .stringMin(errors.USER_ID_MIN_LENGTH_REACH)
    .stringMax(errors.USER_ID_MAX_LENGTH_REACH)
    .throwAnyway(errors.USER_ID_INVALID)
    .execute();
};

const usernameErrorChecker = (validationResult, username) => {
  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: { validatedUsername: username },
    })
    .required(errors.USERNAME_REQUIRED)
    .stringEmpty(errors.USERNAME_REQUIRED)
    .string(errors.USERNAME_INVALID_TYPE)
    .stringMin(errors.USERNAME_MINLENGTH_REACH)
    .stringMax(errors.USERNAME_MAXLENGTH_REACH)
    .throwAnyway(errors.USERNAME_INVALID)
    .execute();
};

const verificationCodeErrorChecker = (validationResult, verificationCode) => {
  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedVerificationCode: verificationCode,
      },
    })
    .required(errors.VERIFICATION_CODE_REQUIRED)
    .stringEmpty(errors.VERIFICATION_CODE_REQUIRED)
    .string(errors.VERIFICATION_CODE_INVALID_TYPE)
    .stringNumeric(errors.VERIFICATION_CODE_NUMERIC)
    .stringLength(errors.VERIFICATION_CODE_INVALID_LENGTH)
    .throwAnyway(errors.VERIFICATION_CODE_INVALID)
    .execute();
};

const participantIdErrorChecker = (validationResult, participantId) => {
  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedParticipantId: participantId,
      },
    })
    .required(errors.PARTICIPANT_ID_REQUIRED)
    .stringEmpty(errors.PARTICIPANT_ID_REQUIRED)
    .string(errors.PARTICIPANT_ID_INVALID_TYPE)
    .stringMin(errors.PARTICIPANT_ID_MIN_LENGTH_REACH)
    .stringMax(errors.PARTICIPANT_ID_MAX_LENGTH_REACH)
    .throwAnyway(errors.PARTICIPANT_ID_INVALID)
    .execute();
};

const messageTextErrorChecker = (validationResult, messageText) => {
  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedMessageText: messageText,
      },
    })
    .required(errors.MESSAGE_TEXT_REQUIRED)
    .stringEmpty(errors.MESSAGE_TEXT_REQUIRED)
    .string(errors.MESSAGE_TEXT_INVALID_TYPE)
    .stringMin(errors.MESSAGE_ID_MIN_LENGTH_REACH)
    .stringMax(errors.MESSAGE_TEXT_MAX_LENGTH_REACH)
    .throwAnyway(errors.MESSAGE_TEXT_INVALID)
    .execute();
};

const chatIdErrorChecker = (validationResult, chatId) => {
  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedChatId: chatId,
      },
    })
    .required(errors.CHAT_ID_REQUIRED)
    .stringEmpty(errors.CHAT_ID_REQUIRED)
    .string(errors.CHAT_ID_INVALID_TYPE)
    .stringMin(errors.CHAT_ID_MIN_LENGTH_REACH)
    .stringMax(errors.CHAT_ID_MAX_LENGTH_REACH)
    .throwAnyway(errors.CHAT_ID_INVALID)
    .execute();
};

const tokenErrorChecker = (errorBuilder) => {
  errorBuilder
    .required(errors.TOKEN_REQUIRED)
    .string(errors.TOKEN_INVALID_TYPE)
    .stringMin(errors.TOKEN_MINLENGTH_REACH)
    .stringMax(errors.TOKEN_MAXLENGTH_REACH)
    .stringEmpty(errors.TOKEN_REQUIRED)
    .throwAnyway(errors.TOKEN_INVALID)
    .execute();
};

const validatorErrorChecker = {
  chatId: chatIdErrorChecker,
  countryCode: countryCodeErrorChecker,
  countryName: countryNameErrorChecker,
  firstName: firstNameErrorChecker,
  lastName: lastNameErrorChecker,
  messageText: messageTextErrorChecker,
  participantId: participantIdErrorChecker,
  phoneNumber: phoneNumberErrorChecker,
  token: tokenErrorChecker,
  userId: userIdErrorChecker,
  username: usernameErrorChecker,
  verificationCode: verificationCodeErrorChecker,
};

module.exports = {
  validatorErrorChecker,
};
