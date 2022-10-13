const {
  validationErrorBuilder,
} = require("utility-store/src/classes/ValidationErrorBuilder");

const { errors } = require("@/variables/errors/errors");

const { countries } = require("@/variables/others/countries");

const countryCode = (validationResult, countryCode) => {
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

const countryName = (validationResult, countryName) => {
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

const firstName = (validationResult, firstName) => {
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

const lastName = (validationResult, lastName) => {
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

const phoneNumber = (validationResult, phoneNumber) => {
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

const privateId = (validationResult, privateId) => {
  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedPrivateId: privateId,
      },
    })
    .required(errors.PRIVATE_ID_REQUIRED)
    .stringEmpty(errors.PRIVATE_ID_REQUIRED)
    .string(errors.PRIVATE_ID_INVALID_TYPE)
    .stringMin(errors.PRIVATE_ID_MIN_LENGTH_REACH)
    .stringMax(errors.PRIVATE_ID_MAX_LENGTH_REACH)
    .throwAnyway(errors.PRIVATE_ID_INVALID)
    .execute();
};

const username = (validationResult, username) => {
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

const verificationCode = (validationResult, verificationCode) => {
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

const participantId = (validationResult, participantId) => {
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

const messageText = (validationResult, messageText) => {
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

const chatId = (validationResult, chatId) => {
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

const validatorErrorBuilder = {
  chatId,
  countryCode,
  countryName,
  firstName,
  lastName,
  messageText,
  participantId,
  phoneNumber,
  privateId,
  username,
  verificationCode,
};

module.exports = {
  validatorErrorBuilder,
};
