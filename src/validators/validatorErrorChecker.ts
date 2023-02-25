import { customTypeof } from "custom-typeof";
import { errorThrower } from "utility-store/src/utilities/utilities";
import { validationErrorBuilder } from "utility-store/src/classes/ValidationErrorBuilder";

import { models } from "@/models";

import { errors } from "@/variables/errors";
import { countries } from "@/variables/others/countries";

const userModels = models.native.user;
const chatModels = models.native.chat;

const bioErrorChecker = (validationResult, bio) => {
  const errorChecker = validationErrorBuilder.create();

  errorChecker
    .setRequirements(
      validationResult,
      {
        extraErrorFields: {
          validatedBio: bio,
        },
      },
      userModels.bio
    )
    .required()
    .string()
    .stringMax()
    .stringMin()
    .throwAnyway(errors.BIO_INVALID)
    .execute();
};

const countryCodeErrorChecker = (validationResult, countryCode) => {
  const errorChecker = validationErrorBuilder.create();

  if (validationResult === true) {
    const country = countries.find((c) => c.countryCode === countryCode);
    errorThrower(
      customTypeof.isUndefined(country),
      errors.COUNTRY_CODE_NOT_SUPPORTED
    );

    return;
  }

  errorChecker
    .setRequirements(
      validationResult,
      {
        extraErrorFields: {
          validatedCountryCode: countryCode,
        },
      },
      userModels.countryCode
    )
    .required()
    .stringEmpty()
    .string()
    .stringNumeric()
    .stringMin()
    .stringMax()
    .throwAnyway(errors.COUNTRY_CODE_INVALID)
    .execute();
};

const countryNameErrorChecker = (validationResult, countryName) => {
  const errorChecker = validationErrorBuilder.create();

  if (validationResult === true) {
    const country = countries.find((c) => c.countryName === countryName);
    errorThrower(
      customTypeof.isUndefined(country),
      errors.COUNTRY_NAME_NOT_SUPPORTED
    );

    return;
  }

  errorChecker
    .setRequirements(
      validationResult,
      {
        extraErrorFields: {
          validatedCountryName: countryName,
        },
      },
      userModels.countryName
    )
    .required()
    .stringEmpty()
    .string()
    .stringMax()
    .stringMin()
    .throwAnyway(errors.COUNTRY_NAME_INVALID)
    .execute();
};

const firstNameErrorChecker = (validationResult, firstName) => {
  validationErrorBuilder
    .create()
    .setRequirements(
      validationResult,
      {
        extraErrorFields: {
          validatedFirstName: firstName,
        },
      },
      userModels.firstName
    )
    .required()
    .stringEmpty()
    .string()
    .stringMin()
    .stringMax()
    .throwAnyway(errors.FIRST_NAME_INVALID)
    .execute();
};

const lastNameErrorChecker = (validationResult, lastName) => {
  validationErrorBuilder
    .create()
    .setRequirements(
      validationResult,
      {
        extraErrorFields: { validatedLastName: lastName },
      },
      userModels.lastName
    )
    .required()
    .string()
    .stringMin()
    .stringMax()
    .throwAnyway(errors.LAST_NAME_INVALID)
    .execute();
};

const phoneNumberErrorChecker = (validationResult, phoneNumber) => {
  validationErrorBuilder
    .create()
    .setRequirements(
      validationResult,
      {
        extraErrorFields: {
          validatedPhoneNumber: phoneNumber,
        },
      },
      userModels.phoneNumber
    )
    .required()
    .stringEmpty()
    .string()
    .stringMax()
    .stringMin()
    .stringNumeric()
    .throwAnyway(errors.PHONE_NUMBER_INVALID)
    .execute();
};

const userIdErrorChecker = (validationResult, userId) => {
  validationErrorBuilder
    .create()
    .setRequirements(
      validationResult,
      {
        extraErrorFields: {
          validatedUserId: userId,
        },
      },
      userModels.userId
    )
    .required()
    .stringEmpty()
    .string()
    .stringMin()
    .stringMax()
    .throwAnyway(errors.USER_ID_INVALID)
    .execute();
};

const usernameErrorChecker = (validationResult, username) => {
  validationErrorBuilder
    .create()
    .setRequirements(
      validationResult,
      {
        extraErrorFields: { validatedUsername: username },
      },
      userModels.username
    )
    .required()
    .stringEmpty()
    .string()
    .stringMin()
    .stringMax()
    .throwAnyway(errors.USERNAME_INVALID)
    .execute();
};

const verificationCodeErrorChecker = (validationResult, verificationCode) => {
  validationErrorBuilder
    .create()
    .setRequirements(
      validationResult,
      {
        extraErrorFields: {
          validatedVerificationCode: verificationCode,
        },
      },
      userModels.verificationCode
    )
    .required()
    .stringEmpty()
    .string()
    .stringNumeric()
    .stringLength()
    .throwAnyway(errors.VERIFICATION_CODE_INVALID)
    .execute();
};

const participantIdErrorChecker = (validationResult, participantId) => {
  validationErrorBuilder
    .create()
    .setRequirements(
      validationResult,
      {
        extraErrorFields: {
          validatedParticipantId: participantId,
        },
      },
      chatModels.participantId
    )
    .required()
    .stringEmpty()
    .string()
    .stringMin()
    .stringMax()
    .throwAnyway(errors.PARTICIPANT_ID_INVALID)
    .execute();
};

const messageErrorChecker = (validationResult, messageText) => {
  validationErrorBuilder
    .create()
    .setRequirements(
      validationResult,
      {
        extraErrorFields: {
          validatedMessageText: messageText,
        },
      },
      chatModels.message
    )
    .required()
    .stringEmpty()
    .string()
    .stringMin()
    .stringMax()
    .throwAnyway(errors.MESSAGE_TEXT_INVALID)
    .execute();
};

const chatIdErrorChecker = (validationResult, chatId) => {
  validationErrorBuilder
    .create()
    .setRequirements(
      validationResult,
      {
        extraErrorFields: {
          validatedChatId: chatId,
        },
      },
      chatModels.chatId
    )
    .required()
    .stringEmpty()
    .string()
    .stringMin()
    .stringMax()
    .throwAnyway(errors.CHAT_ID_INVALID)
    .execute();
};

const tokenErrorChecker = (errorChecker) => {
  errorChecker
    .required()
    .stringEmpty()
    .string()
    .stringMin()
    .stringMax()
    .throwAnyway(errors.TOKEN_INVALID)
    .execute();
};

const validatorErrorChecker = {
  bio: bioErrorChecker,
  chatId: chatIdErrorChecker,
  countryCode: countryCodeErrorChecker,
  countryName: countryNameErrorChecker,
  firstName: firstNameErrorChecker,
  lastName: lastNameErrorChecker,
  message: messageErrorChecker,
  participantId: participantIdErrorChecker,
  phoneNumber: phoneNumberErrorChecker,
  token: tokenErrorChecker,
  userId: userIdErrorChecker,
  username: usernameErrorChecker,
  verificationCode: verificationCodeErrorChecker,
};

export { validatorErrorChecker };
