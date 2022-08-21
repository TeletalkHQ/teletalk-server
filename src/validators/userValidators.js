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

const { countries } = require("@/variables/others/countries");

const {
  userErrors: {
    CELLPHONE_REQUIRED,
    COUNTRY_CODE_INVALID,
    COUNTRY_CODE_INVALID_TYPE,
    COUNTRY_CODE_NOT_SUPPORTED,
    COUNTRY_CODE_NUMERIC,
    COUNTRY_CODE_REQUIRED,
    COUNTRY_NAME_INVALID,
    COUNTRY_NAME_INVALID_TYPE,
    COUNTRY_NAME_NOT_SUPPORTED,
    COUNTRY_NAME_REQUIRED,
    FIRST_NAME_INVALID_TYPE,
    FIRST_NAME_MAXLENGTH_REACH,
    FIRST_NAME_MINLENGTH_REACH,
    FIRST_NAME_REQUIRED,
    LAST_NAME_INVALID,
    LAST_NAME_INVALID_TYPE,
    LAST_NAME_MAXLENGTH_REACH,
    PHONE_NUMBER_INVALID,
    PHONE_NUMBER_INVALID_TYPE,
    PHONE_NUMBER_NUMERIC,
    PHONE_NUMBER_REQUIRED,
    PRIVATE_ID_INVALID,
    PRIVATE_ID_INVALID_TYPE,
    PRIVATE_ID_MAX_LENGTH_REACH,
    PRIVATE_ID_MIN_LENGTH_REACH,
    PRIVATE_ID_REQUIRED,
    TOKEN_INVALID,
    TOKEN_INVALID_TYPE,
    TOKEN_REQUIRED,
    USERNAME_INVALID,
    USERNAME_INVALID_TYPE,
    USERNAME_MAXLENGTH_REACH,
    USERNAME_MINLENGTH_REACH,
    USERNAME_REQUIRED,
    VERIFICATION_CODE_INVALID,
    VERIFICATION_CODE_NUMERIC,
    VERIFICATION_CODE_REQUIRED,
    COUNTRY_CODE_MINLENGTH_REACH,
    COUNTRY_CODE_MAXLENGTH_REACH,
    COUNTRY_NAME_MINLENGTH_REACH,
    COUNTRY_NAME_MAXLENGTH_REACH,
    PHONE_NUMBER_MINLENGTH_REACH,
    PHONE_NUMBER_MAXLENGTH_REACH,
    VERIFICATION_CODE_INVALID_TYPE,
    VERIFICATION_CODE_INVALID_LENGTH,
  },
} = require("@/variables/errors/userErrors");

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
    const result = await compiledCountryCodeValidator({ countryCode });

    const errorBuilder = validationErrorBuilder.create();
    errorBuilder
      .setRequirements(result, {
        extraErrorFields: {
          validatedCountryCode: countryCode,
        },
      })
      .customCheck(result === true, () => {
        const country = countries.find((c) => c.countryCode === countryCode);

        errorBuilder.addError(
          country === undefined,
          COUNTRY_CODE_NOT_SUPPORTED
        );
      })
      .stringEmpty(COUNTRY_CODE_REQUIRED)
      .required(COUNTRY_CODE_REQUIRED)
      .string(COUNTRY_CODE_INVALID_TYPE)
      .stringNumeric(COUNTRY_CODE_NUMERIC)
      .stringMin(COUNTRY_CODE_MINLENGTH_REACH)
      .stringMax(COUNTRY_CODE_MAXLENGTH_REACH)
      .throwAnyway(COUNTRY_CODE_INVALID)
      .execute();
  } catch (error) {
    logger.log("countryCodeValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const countryNameValidator = async (countryName, returnCondition) => {
  try {
    const result = await compiledCountryNameValidator({ countryName });

    const errorBuilder = validationErrorBuilder.create();

    errorBuilder
      .setRequirements(result, {
        extraErrorFields: {
          validatedCountryName: countryName,
        },
      })
      .customCheck(result === true, () => {
        const country = countries.find((c) => c.countryName === countryName);

        errorBuilder.addError(
          country === undefined,
          COUNTRY_NAME_NOT_SUPPORTED
        );
      })
      .required(COUNTRY_NAME_REQUIRED)
      .stringEmpty(COUNTRY_NAME_REQUIRED)
      .string(COUNTRY_NAME_INVALID_TYPE)
      .stringMax(COUNTRY_NAME_MAXLENGTH_REACH)
      .stringMin(COUNTRY_NAME_MINLENGTH_REACH)
      .throwAnyway(COUNTRY_NAME_INVALID)
      .execute();
  } catch (error) {
    logger.log("countryNameValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const firstNameValidator = async (firstName, returnCondition) => {
  try {
    const result = await compiledFirstNameValidator({ firstName });

    if (result === true) return { done: true };

    validationErrorBuilder
      .create()
      .setRequirements(result, {
        extraErrorFields: {
          validatedFirstName: firstName,
        },
      })
      .required(FIRST_NAME_REQUIRED)
      .stringEmpty(FIRST_NAME_REQUIRED)
      .string(FIRST_NAME_INVALID_TYPE)
      .stringMin(FIRST_NAME_MINLENGTH_REACH)
      .stringMax(FIRST_NAME_MAXLENGTH_REACH)
      .execute();
  } catch (error) {
    logger.log("firstNameValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const lastNameValidator = async (lastName, returnCondition) => {
  try {
    const result = await compiledLastNameValidator({ lastName });

    if (result === true) return { done: true };

    validationErrorBuilder
      .create()
      .setRequirements(result, {
        extraErrorFields: { validatedLastName: lastName },
      })
      .string(LAST_NAME_INVALID_TYPE)
      .stringMax(LAST_NAME_MAXLENGTH_REACH)
      .throwAnyway(LAST_NAME_INVALID)
      .execute();
  } catch (error) {
    logger.log("lastNameValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const phoneNumberValidator = async (phoneNumber, returnCondition) => {
  try {
    const result = await compiledPhoneNumberValidator({ phoneNumber });

    if (result === true) return { done: true };

    validationErrorBuilder
      .create()
      .setRequirements(result, {
        extraErrorFields: {
          validatedPhoneNumber: phoneNumber,
        },
      })
      .required(PHONE_NUMBER_REQUIRED)
      .stringEmpty(PHONE_NUMBER_REQUIRED)
      .string(PHONE_NUMBER_INVALID_TYPE)
      .stringMax(PHONE_NUMBER_MAXLENGTH_REACH)
      .stringMin(PHONE_NUMBER_MINLENGTH_REACH)
      .stringNumeric(PHONE_NUMBER_NUMERIC)
      .throwAnyway(PHONE_NUMBER_INVALID)
      .execute();
  } catch (error) {
    logger.log("countryNameValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const privateIdValidator = async (privateId, returnCondition) => {
  try {
    const result = await compiledPrivateIdValidator({ privateId });

    if (result === true) return { done: true };

    validationErrorBuilder
      .create()
      .setRequirements(result, {
        extraErrorFields: {
          validatedPrivateId: privateId,
        },
      })
      .required(PRIVATE_ID_REQUIRED)
      .stringEmpty(PRIVATE_ID_REQUIRED)
      .string(PRIVATE_ID_INVALID_TYPE)
      .stringMin(PRIVATE_ID_MIN_LENGTH_REACH)
      .stringMax(PRIVATE_ID_MAX_LENGTH_REACH)
      .throwAnyway(PRIVATE_ID_INVALID)
      .execute();
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
    const result = await compiledTokenValidator({ token });

    const errorBuilder = validationErrorBuilder.create();

    errorBuilder
      .setRequirements(result, {
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
    const result = await compiledUsernameValidator({ username });

    if (result === true) return { done: true };

    validationErrorBuilder
      .create()
      .setRequirements(result, {
        extraErrorFields: { validatedUsername: username },
      })
      .required(USERNAME_REQUIRED)
      .stringEmpty(USERNAME_REQUIRED)
      .string(USERNAME_INVALID_TYPE)
      .stringMin(USERNAME_MINLENGTH_REACH)
      .stringMax(USERNAME_MAXLENGTH_REACH)
      .throwAnyway(USERNAME_INVALID)
      .execute();
  } catch (error) {
    logger.log("usernameValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const verificationCodeValidator = async (verificationCode, returnCondition) => {
  try {
    const result = await compiledVerificationCodeValidator({
      verificationCode,
    });

    if (result === true) return { done: true };

    validationErrorBuilder
      .create()
      .setRequirements(result, {
        extraErrorFields: {
          validatedVerificationCode: verificationCode,
        },
      })
      .required(VERIFICATION_CODE_REQUIRED)
      .stringEmpty(VERIFICATION_CODE_REQUIRED)
      .string(VERIFICATION_CODE_INVALID_TYPE)
      .stringNumeric(VERIFICATION_CODE_NUMERIC)
      .stringLength(VERIFICATION_CODE_INVALID_LENGTH)
      .throwAnyway(VERIFICATION_CODE_INVALID)
      .execute();
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
