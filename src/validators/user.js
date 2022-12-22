const { trier } = require("utility-store/src/classes/Trier");
const {
  validationErrorBuilder,
} = require("utility-store/src/classes/ValidationErrorBuilder");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { authManager } = require("@/classes/AuthManager");

const { errorThrower } = require("utility-store/src/functions/utilities");

const { compiledValidators } = require("@/validators/compiledValidators");
const { validatorErrorChecker } = require("@/validators/validatorErrorChecker");

const { errors } = require("@/variables/errors");

//CLEANME: Remove
const trierInstance = async (callerName, callback, ...params) =>
  await trier(callerName)
    .tryAsync(callback, ...params)
    .throw()
    .runAsync();

const tryToValidateCountryCode = async (countryCode) => {
  const validationResult = await compiledValidators.countryCode({
    countryCode,
  });
  validatorErrorChecker.countryCode(validationResult, countryCode);
};
const countryCodeValidator = async (countryCode) => {
  await trierInstance(
    countryCodeValidator.name,
    tryToValidateCountryCode,
    countryCode
  );
};

const tryToValidateCountryName = async (countryName) => {
  const validationResult = await compiledValidators.countryName({
    countryName,
  });
  validatorErrorChecker.countryName(validationResult, countryName);
};
const countryNameValidator = async (countryName) => {
  await trierInstance(
    countryNameValidator.name,
    tryToValidateCountryName,
    countryName
  );
};

const tryToValidateFirstName = async (firstName) => {
  const validationResult = await compiledValidators.firstName({ firstName });
  if (validationResult === true) return;
  validatorErrorChecker.firstName(validationResult, firstName);
};
const firstNameValidator = async (firstName) => {
  await trierInstance(
    firstNameValidator.name,
    tryToValidateFirstName,
    firstName
  );
};

const tryToValidateLastName = async (lastName) => {
  const validationResult = await compiledValidators.lastName({ lastName });
  if (validationResult === true) return;
  validatorErrorChecker.lastName(validationResult, lastName);
};
const lastNameValidator = async (lastName) => {
  await trierInstance(lastNameValidator.name, tryToValidateLastName, lastName);
};

const tryToValidatePhoneNumber = async (phoneNumber) => {
  const validationResult = await compiledValidators.phoneNumber({
    phoneNumber,
  });

  if (validationResult === true) return;

  validatorErrorChecker.phoneNumber(validationResult, phoneNumber);
};
const phoneNumberValidator = async (phoneNumber) => {
  await trierInstance(
    phoneNumberValidator.name,
    tryToValidatePhoneNumber,
    phoneNumber
  );
};

const tryToValidateCellphone = async (cellphone) => {
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
const cellphoneValidator = async (cellphone = {}) => {
  await trierInstance(
    cellphoneValidator.name,
    tryToValidateCellphone,
    cellphone
  );
};

const tryToValidateContact = async (contact) => {
  await cellphoneValidator(userPropsUtilities.extractCellphone(contact));
  await firstNameValidator(contact.firstName);
  await lastNameValidator(contact.lastName);
};
const contactValidator = async (contact) => {
  await trierInstance(contactValidator.name, tryToValidateContact, contact);
};

const tryToValidateUserId = async (userId) => {
  const validationResult = await compiledValidators.userId({ userId });
  if (validationResult === true) return;
  validatorErrorChecker.userId(validationResult, userId);
};

const userIdValidator = async (userId) => {
  await trierInstance(userIdValidator.name, tryToValidateUserId, userId);
};

const tryToValidateToken = async (token, secret) => {
  const correctedToken = +token || token;
  const validationResult = await compiledValidators.token({
    token: correctedToken,
  });

  const errorBuilder = validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedToken: correctedToken,
        correctedToken: correctedToken,
        originalToken: token,
      },
    });

  validatorErrorChecker.token(errorBuilder);

  const verifiedToken = authManager.verifyToken(token, secret);
  if (verifiedToken.ok === true) return verifiedToken.data;

  errorBuilder
    .addExtraErrorFields({
      tokenError: verifiedToken.error,
    })
    .addError(verifiedToken.ok === false, errors.TOKEN_INVALID)
    .execute();
};
const tokenValidator = async (
  token,
  secret = authManager.getJwtMainSecret()
) => {
  return await trierInstance(
    tokenValidator.name,
    tryToValidateToken,
    token,
    secret
  );
};

const tryToValidateUsername = async (username) => {
  const validationResult = await compiledValidators.username({ username });
  if (validationResult === true) return;
  validatorErrorChecker.username(validationResult, username);
};
const usernameValidator = async (username) => {
  await trierInstance(usernameValidator.name, tryToValidateUsername, username);
};

const tryToValidateVerificationCode = async (verificationCode) => {
  const validationResult = await compiledValidators.verificationCode({
    verificationCode,
  });

  if (validationResult === true) return;

  validatorErrorChecker.verificationCode(validationResult, verificationCode);
};
const verificationCodeValidator = async (verificationCode) => {
  await trierInstance(
    verificationCodeValidator.name,
    tryToValidateVerificationCode,
    verificationCode
  );
};

const userValidators = {
  cellphone: cellphoneValidator,
  contact: contactValidator,
  countryCode: countryCodeValidator,
  countryName: countryNameValidator,
  firstName: firstNameValidator,
  lastName: lastNameValidator,
  phoneNumber: phoneNumberValidator,
  userId: userIdValidator,
  token: tokenValidator,
  username: usernameValidator,
  verificationCode: verificationCodeValidator,
};
module.exports = { userValidators };
