/* eslint-disable no-inner-declarations */
const { validationErrorBuilder } = require("@/classes/Builders");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { authManager } = require("@/classes/AuthManager");
const { ValidationModelBuilder } = require("@/classes/ValidationModelBuilder");

const { errorThrower, getErrorObject } = require("@/functions/utilities/utils");

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
  userErrors: {
    CELLPHONE_REQUIRED,
    TOKEN_INVALID,
    TOKEN_INVALID_TYPE,
    TOKEN_REQUIRED,
  },
} = require("@/variables/errors/userErrors");
const {
  countryCodeValidatorErrorBuilder,
  countryNameValidatorErrorBuilder,
  firstNameValidatorErrorBuilder,
  lastNameValidatorErrorBuilder,
  phoneNumberValidatorErrorBuilder,
  privateIdValidatorErrorBuilder,
  usernameValidatorErrorBuilder,
  verificationCodeValidatorErrorBuilder,
} = require("./userValidatorErrorBuilders");

const checkReturnCondition = (returnCondition, error) => {
  if (returnCondition) {
    return error;
  }

  errorThrower(error, error);
};

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

const contactValidator = async (contact, returnCondition) => {
  try {
    await cellphoneValidator(userPropsUtilities.extractCellphone(contact));
    await firstNameValidator(contact.firstName);
    await lastNameValidator(contact.lastName);

    return { done: true };
  } catch (error) {
    logger.log("contactValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const cellphoneValidator = async (cellphone = {}, returnCondition) => {
  try {
    const { countryCode, countryName, phoneNumber } = cellphone;

    errorThrower(!phoneNumber && !countryCode && !countryName, () => {
      return getErrorObject(CELLPHONE_REQUIRED);
    });

    // const countryCodeValidationError =
    await countryCodeValidator(countryCode, false);
    // const countryNameValidationError =
    await countryNameValidator(countryName, false);
    // const phoneNumberValidationError =
    await phoneNumberValidator(phoneNumber, false);
  } catch (error) {
    logger.log("cellphoneValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const countryCodeValidator = async (countryCode, returnCondition) => {
  try {
    const validationResult = await compiledCountryCodeValidator({
      countryCode,
    });

    countryCodeValidatorErrorBuilder(validationResult, countryCode);
  } catch (error) {
    logger.log("countryCodeValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const countryNameValidator = async (countryName, returnCondition) => {
  try {
    const validationResult = await compiledCountryNameValidator({
      countryName,
    });

    countryNameValidatorErrorBuilder(validationResult, countryName);
  } catch (error) {
    logger.log("countryNameValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const firstNameValidator = async (firstName, returnCondition) => {
  try {
    const validationResult = await compiledFirstNameValidator({ firstName });

    if (validationResult === true) return { done: true };

    firstNameValidatorErrorBuilder(validationResult, firstName);
  } catch (error) {
    logger.log("firstNameValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const lastNameValidator = async (lastName, returnCondition) => {
  try {
    const validationResult = await compiledLastNameValidator({ lastName });

    if (validationResult === true) return { done: true };

    lastNameValidatorErrorBuilder(validationResult, lastName);
  } catch (error) {
    logger.log("lastNameValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const phoneNumberValidator = async (phoneNumber, returnCondition) => {
  try {
    const validationResult = await compiledPhoneNumberValidator({
      phoneNumber,
    });

    if (validationResult === true) return { done: true };

    phoneNumberValidatorErrorBuilder(validationResult, phoneNumber);
  } catch (error) {
    logger.log("countryNameValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const privateIdValidator = async (privateId, returnCondition) => {
  try {
    const validationResult = await compiledPrivateIdValidator({ privateId });

    if (validationResult === true) return { done: true };

    privateIdValidatorErrorBuilder(validationResult, privateId);
  } catch (error) {
    logger.log("privateIdValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const tokenValidator = async (
  token,
  secret = authManager.getJwtMainSecret(),
  returnCondition
) => {
  try {
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
      .stringEmpty(TOKEN_REQUIRED)
      .string(TOKEN_INVALID_TYPE)
      .throwAnyway(TOKEN_INVALID)
      .execute();

    const verifiedToken = authManager.tokenVerifier(token, secret);
    if (verifiedToken.done === true) return verifiedToken.data;

    errorBuilder
      .addExtraErrorFields({
        tokenError: verifiedToken.error,
      })
      .addError(verifiedToken.done === false, TOKEN_INVALID)
      .execute();
  } catch (error) {
    logger.log("tokenValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const usernameValidator = async (username, returnCondition) => {
  try {
    const validationResult = await compiledUsernameValidator({ username });

    if (validationResult === true) return { done: true };

    usernameValidatorErrorBuilder(validationResult, username);
  } catch (error) {
    logger.log("usernameValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const verificationCodeValidator = async (verificationCode, returnCondition) => {
  try {
    const validationResult = await compiledVerificationCodeValidator({
      verificationCode,
    });

    if (validationResult === true) return { done: true };

    verificationCodeValidatorErrorBuilder(validationResult, verificationCode);
  } catch (error) {
    logger.log("verificationCodeValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
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
