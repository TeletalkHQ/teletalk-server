import { customTypeof } from "custom-typeof";
import { errorThrower, Result, validationChecker } from "utility-store";

import { models } from "@/models";

import { errors } from "@/variables/errors";
import { countries } from "@/variables/others/countries";

const userModels = models.native.user;
const chatModels = models.native.chat;

const bioChecker = (result: Result, bio: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedBio: bio,
      },
    },
    userModels.bio
  ).check(function () {
    this.required()
      .string()
      .stringMax()
      .stringMin()
      .throwAnyway(errors.BIO_INVALID);
  });
};

const countryCodeChecker = (result: Result, countryCode: unknown) => {
  if (result === true) {
    const country = countries.find((c) => c.countryCode === countryCode);
    errorThrower(
      customTypeof.isUndefined(country),
      errors.COUNTRY_CODE_NOT_SUPPORTED
    );

    return;
  }

  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedCountryCode: countryCode,
      },
    },
    userModels.countryCode
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringNumeric()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.COUNTRY_CODE_INVALID);
  });
};

const countryNameChecker = (result: Result, countryName: unknown) => {
  if (result === true) {
    const country = countries.find((c) => c.countryName === countryName);
    errorThrower(
      customTypeof.isUndefined(country),
      errors.COUNTRY_NAME_NOT_SUPPORTED
    );

    return;
  }

  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedCountryName: countryName,
      },
    },
    userModels.countryName
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMax()
      .stringMin()
      .throwAnyway(errors.COUNTRY_NAME_INVALID);
  });
};

const firstNameChecker = (result: Result, firstName: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedFirstName: firstName,
      },
    },
    userModels.firstName
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.FIRST_NAME_INVALID);
  });
};

const lastNameChecker = (result: Result, lastName: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: { validatedLastName: lastName },
    },
    userModels.lastName
  ).check(function () {
    this.required()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.LAST_NAME_INVALID);
  });
};

const phoneNumberChecker = (result: Result, phoneNumber: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedPhoneNumber: phoneNumber,
      },
    },
    userModels.phoneNumber
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMax()
      .stringMin()
      .stringNumeric()
      .throwAnyway(errors.PHONE_NUMBER_INVALID);
  });
};

const userIdChecker = (result: Result, userId: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedUserId: userId,
      },
    },
    userModels.userId
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.USER_ID_INVALID);
  });
};

const usernameChecker = (result: Result, username: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: { validatedUsername: username },
    },
    userModels.username
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.USERNAME_INVALID);
  });
};

const verificationCodeChecker = (result: Result, verificationCode: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedVerificationCode: verificationCode,
      },
    },
    userModels.verificationCode
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringNumeric()
      .stringLength()
      .throwAnyway(errors.VERIFICATION_CODE_INVALID);
  });
};

const participantIdChecker = (result: Result, participantId: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedParticipantId: participantId,
      },
    },
    chatModels.participantId
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.PARTICIPANT_ID_INVALID);
  });
};

const messageChecker = (result: Result, messageText: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedMessageText: messageText,
      },
    },
    chatModels.message
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.MESSAGE_TEXT_INVALID);
  });
};

const chatIdChecker = (result: Result, chatId: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedChatId: chatId,
      },
    },
    chatModels.chatId
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.CHAT_ID_INVALID);
  });
};

const checkers = {
  bio: bioChecker,
  chatId: chatIdChecker,
  countryCode: countryCodeChecker,
  countryName: countryNameChecker,
  firstName: firstNameChecker,
  lastName: lastNameChecker,
  message: messageChecker,
  participantId: participantIdChecker,
  phoneNumber: phoneNumberChecker,
  userId: userIdChecker,
  username: usernameChecker,
  verificationCode: verificationCodeChecker,
};

export { checkers as validationChecker };
