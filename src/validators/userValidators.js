const { trier } = require("utility-store/src/classes/Trier");
const {
  validationErrorBuilder,
} = require("utility-store/src/classes/ValidationErrorBuilder");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { authManager } = require("@/classes/AuthManager");

const { errorThrower } = require("@/functions/utilities/utilities");

const {
  compiledValidators: {
    compiledCountryCodeValidator,
    compiledCountryNameValidator,
    compiledFirstNameValidator,
    compiledLastNameValidator,
    compiledPhoneNumberValidator,
    compiledPrivateIdValidator,
    compiledTokenValidator,
    compiledUsernameValidator,
    compiledVerificationCodeValidator,
    macAddressValidator,
  },
} = require("@/validators/compiledValidators");
const {
  countryCodeValidatorErrorBuilder,
  countryNameValidatorErrorBuilder,
  firstNameValidatorErrorBuilder,
  lastNameValidatorErrorBuilder,
  phoneNumberValidatorErrorBuilder,
  privateIdValidatorErrorBuilder,
  usernameValidatorErrorBuilder,
  verificationCodeValidatorErrorBuilder,
} = require("@/validators/validatorErrorBuilders");

const {
  userErrors: {
    CELLPHONE_REQUIRED,
    TOKEN_INVALID,
    TOKEN_INVALID_TYPE,
    TOKEN_MAXLENGTH_REACH,
    TOKEN_MINLENGTH_REACH,
    TOKEN_REQUIRED,
  },
} = require("@/variables/errors/userErrors");

const trierInstance = async (callerName, callback, ...params) =>
  (await trier(callerName).tryAsync(callback, ...params)).printAndThrow();

const tryToValidateCountryCode = async (countryCode) => {
  const validationResult = await compiledCountryCodeValidator({
    countryCode,
  });
  countryCodeValidatorErrorBuilder(validationResult, countryCode);
};
const countryCodeValidator = async (countryCode) => {
  await trierInstance(
    countryCodeValidator.name,
    tryToValidateCountryCode,
    countryCode
  );
};

const tryToValidateCountryName = async (countryName) => {
  const validationResult = await compiledCountryNameValidator({
    countryName,
  });
  countryNameValidatorErrorBuilder(validationResult, countryName);
};
const countryNameValidator = async (countryName) => {
  await trierInstance(
    countryNameValidator.name,
    tryToValidateCountryName,
    countryName
  );
};

const tryToValidateFirstName = async (firstName) => {
  const validationResult = await compiledFirstNameValidator({ firstName });
  if (validationResult === true) return;
  firstNameValidatorErrorBuilder(validationResult, firstName);
};
const firstNameValidator = async (firstName) => {
  await trierInstance(
    firstNameValidator.name,
    tryToValidateFirstName,
    firstName
  );
};

const tryToValidateLastName = async (lastName) => {
  const validationResult = await compiledLastNameValidator({ lastName });
  if (validationResult === true) return;
  lastNameValidatorErrorBuilder(validationResult, lastName);
};
const lastNameValidator = async (lastName) => {
  await trierInstance(lastNameValidator.name, tryToValidateLastName, lastName);
};

const tryToValidatePhoneNumber = async (phoneNumber) => {
  const validationResult = await compiledPhoneNumberValidator({
    phoneNumber,
  });

  if (validationResult === true) return;

  phoneNumberValidatorErrorBuilder(validationResult, phoneNumber);
};
const phoneNumberValidator = async (phoneNumber) => {
  await trierInstance(
    phoneNumberValidator.name,
    tryToValidatePhoneNumber,
    phoneNumber
  );
};

const tryToValidateCellphone = async (cellphone) => {
  const { countryCode, countryName, phoneNumber } = cellphone;

  errorThrower(!phoneNumber && !countryCode && !countryName, () => ({
    ...CELLPHONE_REQUIRED,
    validatedCellphone: cellphone,
  }));

  await countryCodeValidator(countryCode);
  await countryNameValidator(countryName);
  await phoneNumberValidator(phoneNumber);
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

const tryToValidatePrivateId = async (privateId) => {
  const validationResult = await compiledPrivateIdValidator({ privateId });
  if (validationResult === true) return;
  privateIdValidatorErrorBuilder(validationResult, privateId);
};
const privateIdValidator = async (privateId) => {
  await trierInstance(
    privateIdValidator.name,
    tryToValidatePrivateId,
    privateId
  );
};

const tryToValidateToken = async (token, secret) => {
  const validationResult = await compiledTokenValidator({ token });

  const errorBuilder = validationErrorBuilder.create();

  //CLEANME Like others extract me, please!
  errorBuilder
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedToken: token,
      },
    })
    .required(TOKEN_REQUIRED)
    .stringMin(TOKEN_MINLENGTH_REACH)
    .stringMax(TOKEN_MAXLENGTH_REACH)
    .stringEmpty(TOKEN_REQUIRED)
    .string(TOKEN_INVALID_TYPE)
    .throwAnyway(TOKEN_INVALID)
    .execute();

  const verifiedToken = authManager.tokenVerifier(token, secret);
  if (verifiedToken.ok === true) return verifiedToken.data;

  errorBuilder
    .addExtraErrorFields({
      tokenError: verifiedToken.error,
    })
    .addError(verifiedToken.ok === false, TOKEN_INVALID)
    .execute();
};
const tokenValidator = async (
  token,
  secret = authManager.getJwtMainSecret()
) => {
  return (
    await trierInstance(tokenValidator.name, tryToValidateToken, token, secret)
  ).result();
};

const tryToValidateUsername = async (username) => {
  const validationResult = await compiledUsernameValidator({ username });
  if (validationResult === true) return;
  usernameValidatorErrorBuilder(validationResult, username);
};
const usernameValidator = async (username) => {
  await trierInstance(usernameValidator.name, tryToValidateUsername, username);
};

const tryToValidateVerificationCode = async (verificationCode) => {
  const validationResult = await compiledVerificationCodeValidator({
    verificationCode,
  });

  if (validationResult === true) return;

  verificationCodeValidatorErrorBuilder(validationResult, verificationCode);
};
const verificationCodeValidator = async (verificationCode) => {
  await trierInstance(
    verificationCodeValidator.name,
    tryToValidateVerificationCode,
    verificationCode
  );
};

module.exports = {
  cellphoneValidator,
  contactValidator,
  countryCodeValidator,
  countryNameValidator,
  firstNameValidator,
  lastNameValidator,
  macAddressValidator,
  phoneNumberValidator,
  privateIdValidator,
  tokenValidator,
  usernameValidator,
  verificationCodeValidator,
};
