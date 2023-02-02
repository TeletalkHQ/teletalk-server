const {
  validationErrorBuilder,
} = require("utility-store/src/classes/ValidationErrorBuilder");
const { errorThrower } = require("utility-store/src/utilities/utilities");

const { authManager } = require("@/classes/AuthManager");
const { userUtilities } = require("@/classes/UserUtilities");

const { models } = require("@/models");

const { compiledValidators } = require("@/validators/compiledValidators");
const { validatorErrorChecker } = require("@/validators/validatorErrorChecker");

const { errors } = require("@/variables/errors");

const bioValidator = async (bio) => {
  const validationResult = await compiledValidators.bio({
    bio,
  });

  validatorErrorChecker.bio(validationResult, bio);
};

const countryCodeValidator = async (countryCode) => {
  const validationResult = await compiledValidators.countryCode({
    countryCode,
  });
  validatorErrorChecker.countryCode(validationResult, countryCode);
};

const countryNameValidator = async (countryName) => {
  const validationResult = await compiledValidators.countryName({
    countryName,
  });
  validatorErrorChecker.countryName(validationResult, countryName);
};

const firstNameValidator = async (firstName) => {
  const validationResult = await compiledValidators.firstName({ firstName });

  validatorErrorChecker.firstName(validationResult, firstName);
};

const lastNameValidator = async (lastName) => {
  const validationResult = await compiledValidators.lastName({ lastName });

  validatorErrorChecker.lastName(validationResult, lastName);
};

const phoneNumberValidator = async (phoneNumber) => {
  const validationResult = await compiledValidators.phoneNumber({
    phoneNumber,
  });

  validatorErrorChecker.phoneNumber(validationResult, phoneNumber);
};

const cellphoneValidator = async (cellphone = {}) => {
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

const contactValidator = async (contact) => {
  await cellphoneValidator(userUtilities.extractCellphone(contact));
  await firstNameValidator(contact.firstName);
  await lastNameValidator(contact.lastName);
};

const userIdValidator = async (userId) => {
  const validationResult = await compiledValidators.userId({ userId });

  validatorErrorChecker.userId(validationResult, userId);
};

const tokenValidator = async (token, secret = authManager.getMainSecret()) => {
  //REFACTOR:INVALID_TYPE_ERROR
  const correctedToken = +token || token;
  const validationResult = await compiledValidators.token({
    token: correctedToken,
  });

  const errorBuilder = validationErrorBuilder.create().setRequirements(
    validationResult,
    {
      extraErrorFields: {
        validatedToken: correctedToken,
        correctedToken,
        originalToken: token,
      },
    },
    models.native.user.token
  );

  validatorErrorChecker.token(errorBuilder);

  return authManager.verifyToken(token, secret).data;
};

const usernameValidator = async (username) => {
  const validationResult = await compiledValidators.username({ username });

  validatorErrorChecker.username(validationResult, username);
};

const verificationCodeValidator = async (verificationCode) => {
  const validationResult = await compiledValidators.verificationCode({
    verificationCode,
  });

  validatorErrorChecker.verificationCode(validationResult, verificationCode);
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

module.exports = { userValidators };
