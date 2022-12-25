const {
  validationErrorBuilder,
} = require("utility-store/src/classes/ValidationErrorBuilder");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { authManager } = require("@/classes/AuthManager");

const { errorThrower } = require("utility-store/src/functions/utilities");

const { compiledValidators } = require("@/validators/compiledValidators");
const { validatorErrorChecker } = require("@/validators/validatorErrorChecker");

const { errors } = require("@/variables/errors");

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
  if (validationResult === true) return;
  validatorErrorChecker.firstName(validationResult, firstName);
};

const lastNameValidator = async (lastName) => {
  const validationResult = await compiledValidators.lastName({ lastName });
  if (validationResult === true) return;
  validatorErrorChecker.lastName(validationResult, lastName);
};

const phoneNumberValidator = async (phoneNumber) => {
  const validationResult = await compiledValidators.phoneNumber({
    phoneNumber,
  });

  if (validationResult === true) return;

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
  await cellphoneValidator(userPropsUtilities.extractCellphone(contact));
  await firstNameValidator(contact.firstName);
  await lastNameValidator(contact.lastName);
};

const userIdValidator = async (userId) => {
  const validationResult = await compiledValidators.userId({ userId });
  if (validationResult === true) return;
  validatorErrorChecker.userId(validationResult, userId);
};

const tokenValidator = async (
  token,
  secret = authManager.getJwtMainSecret()
) => {
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

const usernameValidator = async (username) => {
  const validationResult = await compiledValidators.username({ username });
  if (validationResult === true) return;
  validatorErrorChecker.username(validationResult, username);
};

const verificationCodeValidator = async (verificationCode) => {
  const validationResult = await compiledValidators.verificationCode({
    verificationCode,
  });

  if (validationResult === true) return;

  validatorErrorChecker.verificationCode(validationResult, verificationCode);
};

const userValidators = {
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
