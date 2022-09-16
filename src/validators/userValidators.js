/* eslint-disable no-inner-declarations */
const {
  validationErrorBuilder,
} = require("utility-store/src/classes/ValidationErrorBuilder");

const { ValidationModelBuilder } = require("@/classes/ValidationModelBuilder");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { authManager } = require("@/classes/AuthManager");

const { errorThrower } = require("@/functions/utilities/utilities");

const {
  commonValidationModels: { createdAtValidationModel },
} = require("@/models/validationModels/commonValidationModels");
const {
  userValidationModels: {
    bioValidationModel,
    countryCodeValidationModel,
    countryNameValidationModel,
    firstNameValidationModel,
    lastNameValidationModel,
    macAddressValidationModel,
    phoneNumberValidationModel,
    privateIdValidationModel,
    tokenValidationModel,
    usernameValidationModel,
    verificationCodeValidationModel,
  },
} = require("@/models/validationModels/userValidationModels");

const {
  countryCodeValidatorErrorBuilder,
  countryNameValidatorErrorBuilder,
  firstNameValidatorErrorBuilder,
  lastNameValidatorErrorBuilder,
  phoneNumberValidatorErrorBuilder,
  privateIdValidatorErrorBuilder,
  usernameValidatorErrorBuilder,
  verificationCodeValidatorErrorBuilder,
} = require("@/validators/userValidatorErrorBuilders");

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
const { trier } = require("utility-store/src/classes/Trier");

const bioValidator =
  ValidationModelBuilder.validatorCompiler(bioValidationModel);
const compiledCountryCodeValidator = ValidationModelBuilder.validatorCompiler(
  countryCodeValidationModel
);
const compiledCountryNameValidator = ValidationModelBuilder.validatorCompiler(
  countryNameValidationModel
);
const createdAtValidator = ValidationModelBuilder.validatorCompiler(
  createdAtValidationModel
);
const compiledFirstNameValidator = ValidationModelBuilder.validatorCompiler(
  firstNameValidationModel
);
const compiledLastNameValidator = ValidationModelBuilder.validatorCompiler(
  lastNameValidationModel
);
const macAddressValidator = ValidationModelBuilder.validatorCompiler(
  macAddressValidationModel
);
const compiledPhoneNumberValidator = ValidationModelBuilder.validatorCompiler(
  phoneNumberValidationModel
);
const compiledPrivateIdValidator = ValidationModelBuilder.validatorCompiler(
  privateIdValidationModel
);
const compiledTokenValidator =
  ValidationModelBuilder.validatorCompiler(tokenValidationModel);
const compiledUsernameValidator = ValidationModelBuilder.validatorCompiler(
  usernameValidationModel
);
const compiledVerificationCodeValidator =
  ValidationModelBuilder.validatorCompiler(verificationCodeValidationModel);

const trierInstance = async (callerName, callback, ...params) =>
  (await trier(callerName).tryAsync(callback, ...params)).printAndThrow();

const tryToValidateCountryCode = async (countryCode) => {
  const validationResult = await compiledCountryCodeValidator({
    countryCode,
  });
  //BUG? Why validationResult not checking for being true
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
  //BUG? Why validationResult not checking for being true
  countryNameValidatorErrorBuilder(validationResult, countryName);
};
const countryNameValidator = async (countryName) => {
  await trierInstance(
    countryNameValidator.name,
    tryToValidateCountryName,
    countryName
  );
};

//FIXME remove ok: true
const firstNameValidator = async (firstName) => {
  try {
    const validationResult = await compiledFirstNameValidator({ firstName });

    if (validationResult === true) return { ok: true };

    firstNameValidatorErrorBuilder(validationResult, firstName);
  } catch (error) {
    logger.log("firstNameValidator catch, error:", error);
    throw error;
  }
};
//FIXME remove ok: true
const lastNameValidator = async (lastName) => {
  try {
    const validationResult = await compiledLastNameValidator({ lastName });

    if (validationResult === true) return { ok: true };

    lastNameValidatorErrorBuilder(validationResult, lastName);
  } catch (error) {
    logger.log("lastNameValidator catch, error:", error);
    throw error;
  }
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
  bioValidator,
  cellphoneValidator,
  contactValidator,
  countryCodeValidator,
  countryNameValidator,
  createdAtValidator,
  firstNameValidator,
  lastNameValidator,
  macAddressValidator,
  phoneNumberValidator,
  privateIdValidator,
  tokenValidator,
  usernameValidator,
  verificationCodeValidator,
};
