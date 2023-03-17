import {
  errorThrower,
  validationChecker as validationCheckerMain,
} from "utility-store";

import { authManager } from "@/classes/AuthManager";
import { userUtilities } from "@/classes/UserUtilities";

import { compiledValidators } from "@/helpers/compiledValidators";
import { validationChecker } from "@/helpers/validationChecker";

import { models } from "@/models";

import { Cellphone, Contact } from "@/types";

import { errors } from "@/variables/errors";

const bioValidator = async (bio: unknown) => {
  const validationResult = await compiledValidators.bio({
    bio,
  });

  validationChecker.bio(validationResult, bio);
};

const countryCodeValidator = async (countryCode: unknown) => {
  const validationResult = await compiledValidators.countryCode(countryCode);
  validationChecker.countryCode(validationResult, countryCode);
};

const countryNameValidator = async (countryName: unknown) => {
  const validationResult = await compiledValidators.countryName(countryName);
  validationChecker.countryName(validationResult, countryName);
};

const firstNameValidator = async (firstName: unknown) => {
  const validationResult = await compiledValidators.firstName(firstName);

  validationChecker.firstName(validationResult, firstName);
};

const lastNameValidator = async (lastName: unknown) => {
  const validationResult = await compiledValidators.lastName(lastName);

  validationChecker.lastName(validationResult, lastName);
};

const phoneNumberValidator = async (phoneNumber: unknown) => {
  const validationResult = await compiledValidators.phoneNumber(phoneNumber);

  validationChecker.phoneNumber(validationResult, phoneNumber);
};

const cellphoneValidator = async (cellphone: Cellphone) => {
  errorThrower(
    !cellphone.phoneNumber && !cellphone.countryCode && !cellphone.countryName,
    () => ({
      ...errors.CELLPHONE_REQUIRED,
      validatedCellphone: cellphone,
    })
  );

  await countryCodeValidator(cellphone.countryCode);
  await countryNameValidator(cellphone.countryName);
  await phoneNumberValidator(cellphone.phoneNumber);
};

const contactValidator = async (contact: Contact) => {
  await firstNameValidator(contact.firstName);
  await lastNameValidator(contact.lastName);
  await userIdValidator(contact.userId);
};

const userIdValidator = async (userId: unknown) => {
  const validationResult = await compiledValidators.userId(userId);

  validationChecker.userId(validationResult, userId);
};

const tokenValidator = async (
  token: string,
  secret = authManager.getMainSecret()
) => {
  //REFACTOR:INVALID_TYPE_ERROR
  const correctedToken = +token || token;
  const validationResult = await compiledValidators.token({
    token: correctedToken,
  });

  validationCheckerMain(
    validationResult,
    {
      extraErrorFields: {
        correctedToken,
        originalToken: token,
        validatedToken: correctedToken,
      },
    },
    models.native.user.token
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.TOKEN_INVALID);
  });

  return authManager.verifyToken(token, secret);
};

const usernameValidator = async (username: unknown) => {
  const validationResult = await compiledValidators.username(username);

  validationChecker.username(validationResult, username);
};

const verificationCodeValidator = async (verificationCode: unknown) => {
  const validationResult = await compiledValidators.verificationCode(
    verificationCode
  );

  validationChecker.verificationCode(validationResult, verificationCode);
};

const userValidators = {
  bio: bioValidator,
  cellphone: cellphoneValidator,
  contact: contactValidator,
  countryCode: countryCodeValidator,
  countryName: countryNameValidator,
  firstName: firstNameValidator,
  lastName: lastNameValidator,
  phoneNumber: phoneNumberValidator,
  token: tokenValidator,
  userId: userIdValidator,
  username: usernameValidator,
  verificationCode: verificationCodeValidator,
};

export { userValidators };
