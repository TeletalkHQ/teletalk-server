const { trier } = require("utility-store/src/classes/Trier");
const {
  validationErrorBuilder,
} = require("utility-store/src/classes/ValidationErrorBuilder");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { authManager } = require("@/classes/AuthManager");

const { errorThrower } = require("@/functions/utilities/utilities");

const { compiledValidators } = require("@/validators/compiledValidators");
const {
  validatorErrorBuilder,
} = require("@/validators/validatorErrorBuilders");

const { errors } = require("@/variables/errors");

const trierInstance = async (callerName, callback, ...params) =>
  (await trier(callerName).tryAsync(callback, ...params)).printAndThrow();

const tryToValidateCountryCode = async (countryCode) => {
  const validationResult = await compiledValidators.countryCode({
    countryCode,
  });
  validatorErrorBuilder.countryCode(validationResult, countryCode);
};
const countryCode = async (countryCodeParam) => {
  await trierInstance(
    countryCode.name,
    tryToValidateCountryCode,
    countryCodeParam
  );
};

const tryToValidateCountryName = async (countryName) => {
  const validationResult = await compiledValidators.countryName({
    countryName,
  });
  validatorErrorBuilder.countryName(validationResult, countryName);
};
const countryName = async (countryNameParam) => {
  await trierInstance(
    countryName.name,
    tryToValidateCountryName,
    countryNameParam
  );
};

const tryToValidateFirstName = async (firstName) => {
  const validationResult = await compiledValidators.firstName({ firstName });
  if (validationResult === true) return;
  validatorErrorBuilder.firstName(validationResult, firstName);
};
const firstName = async (firstNameParam) => {
  await trierInstance(firstName.name, tryToValidateFirstName, firstNameParam);
};

const tryToValidateLastName = async (lastName) => {
  const validationResult = await compiledValidators.lastName({ lastName });
  if (validationResult === true) return;
  validatorErrorBuilder.lastName(validationResult, lastName);
};
const lastName = async (lastNameParam) => {
  await trierInstance(lastName.name, tryToValidateLastName, lastNameParam);
};

const tryToValidatePhoneNumber = async (phoneNumber) => {
  const validationResult = await compiledValidators.phoneNumber({
    phoneNumber,
  });

  if (validationResult === true) return;

  validatorErrorBuilder.phoneNumber(validationResult, phoneNumber);
};
const phoneNumber = async (phoneNumberParam) => {
  await trierInstance(
    phoneNumber.name,
    tryToValidatePhoneNumber,
    phoneNumberParam
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

  await countryCode(cellphone.countryCode);
  await countryName(cellphone.countryName);
  await phoneNumber(cellphone.phoneNumber);
};
const cellphone = async (cellphoneParam = {}) => {
  await trierInstance(cellphone.name, tryToValidateCellphone, cellphoneParam);
};

const tryToValidateContact = async (contact) => {
  await cellphone(userPropsUtilities.extractCellphone(contact));
  await firstName(contact.firstName);
  await lastName(contact.lastName);
};
const contact = async (contactParam) => {
  await trierInstance(contact.name, tryToValidateContact, contactParam);
};

const tryToValidateUserId = async (userId) => {
  const validationResult = await compiledValidators.userId({ userId });
  if (validationResult === true) return;
  validatorErrorBuilder.userId(validationResult, userId);
};
const userId = async (userIdParam) => {
  await trierInstance(userId.name, tryToValidateUserId, userIdParam);
};

const tryToValidateToken = async (token, secret) => {
  const validationResult = await compiledValidators.token({ token });

  const errorBuilder = validationErrorBuilder.create();

  //CLEANME Like others extract me, please!
  errorBuilder
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedToken: token,
      },
    })
    .required(errors.TOKEN_REQUIRED)
    .stringMin(errors.TOKEN_MINLENGTH_REACH)
    .stringMax(errors.TOKEN_MAXLENGTH_REACH)
    .stringEmpty(errors.TOKEN_REQUIRED)
    .string(errors.TOKEN_INVALID_TYPE)
    .throwAnyway(errors.TOKEN_INVALID)
    .execute();

  const verifiedToken = authManager.tokenVerifier(token, secret);
  if (verifiedToken.ok === true) return verifiedToken.data;

  errorBuilder
    .addExtraErrorFields({
      tokenError: verifiedToken.error,
    })
    .addError(verifiedToken.ok === false, errors.TOKEN_INVALID)
    .execute();
};
const token = async (tokenParam, secret = authManager.getJwtMainSecret()) => {
  return (
    await trierInstance(token.name, tryToValidateToken, tokenParam, secret)
  ).result();
};

const tryToValidateUsername = async (username) => {
  const validationResult = await compiledValidators.username({ username });
  if (validationResult === true) return;
  validatorErrorBuilder.username(validationResult, username);
};
const username = async (usernameParam) => {
  await trierInstance(username.name, tryToValidateUsername, usernameParam);
};

const tryToValidateVerificationCode = async (verificationCode) => {
  const validationResult = await compiledValidators.verificationCode({
    verificationCode,
  });

  if (validationResult === true) return;

  validatorErrorBuilder.verificationCode(validationResult, verificationCode);
};
const verificationCode = async (verificationCodeParam) => {
  await trierInstance(
    verificationCode.name,
    tryToValidateVerificationCode,
    verificationCodeParam
  );
};

const userValidators = {
  cellphone,
  contact,
  countryCode,
  countryName,
  firstName,
  lastName,
  phoneNumber,
  userId,
  token,
  username,
  verificationCode,
};
module.exports = { userValidators };
