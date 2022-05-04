/* eslint-disable no-inner-declarations */
const { tokenVerifier } = require("@/functions/utilities/tokenVerifier");
const {
  errorThrower,
  getErrorObject,
  getValidatorErrorTypes,
  getEnvironment,
} = require("@/functions/utilities/utilsNoDeps");
const {
  validatorCompiler,
} = require("@/functions/utilities/validatorCompiler");

const {
  commonValidationModels: {
    properties: {
      createdAtValidationModel: { properties: createdAtValidationModel },
    },
  },
} = require("@/models/validationModels/commonValidationModels");
const {
  userValidationModels: {
    properties: {
      bioValidationsModel: { properties: bioValidationsModel },
      cellphoneValidationModel: { properties: cellphoneValidationModel },
      countryCodeValidationModel: { properties: countryCodeValidationModel },
      countryNameValidationModel: { properties: countryNameValidationModel },
      firstNameValidationModel: { properties: firstNameValidationModel },
      lastNameValidationModel: { properties: lastNameValidationModel },
      macAddressValidationModel: { properties: macAddressValidationModel },
      phoneNumberValidationModel: { properties: phoneNumberValidationModel },
      privateIdValidationModel: { properties: privateIdValidationModel },
      tokenValidationModel: { properties: tokenValidationModel },
      usernameValidationModel: { properties: usernameValidationModel },
      verificationCodeValidationModel: {
        properties: verificationCodeValidationModel,
      },
    },
  },
} = require("@/models/validationModels/userValidationModels");

const { countries } = require("@/variables/constants/countries");
const {
  ENVIRONMENT_KEYS,
} = require("@/variables/constants/environmentInitialValues");
const {
  userErrors: {
    properties: {
      CELLPHONE_REQUIRED: { properties: CELLPHONE_REQUIRED },
      COUNTRY_CODE_INVALID: { properties: COUNTRY_CODE_INVALID },
      COUNTRY_CODE_INVALID_TYPE: { properties: COUNTRY_CODE_INVALID_TYPE },
      COUNTRY_CODE_MAXLENGTH_REACH: {
        properties: COUNTRY_CODE_MAXLENGTH_REACH,
      },
      COUNTRY_CODE_MINLENGTH_REACH: {
        properties: COUNTRY_CODE_MINLENGTH_REACH,
      },
      COUNTRY_CODE_NOT_SUPPORTED: { properties: COUNTRY_CODE_NOT_SUPPORTED },
      COUNTRY_CODE_NUMERIC: { properties: COUNTRY_CODE_NUMERIC },
      COUNTRY_CODE_REQUIRED: { properties: COUNTRY_CODE_REQUIRED },
      COUNTRY_NAME_INVALID: { properties: COUNTRY_NAME_INVALID },
      COUNTRY_NAME_INVALID_TYPE: { properties: COUNTRY_NAME_INVALID_TYPE },
      COUNTRY_NAME_MAXLENGTH_REACH: {
        properties: COUNTRY_NAME_MAXLENGTH_REACH,
      },
      COUNTRY_NAME_MINLENGTH_REACH: {
        properties: COUNTRY_NAME_MINLENGTH_REACH,
      },
      COUNTRY_NAME_NOT_SUPPORTED: { properties: COUNTRY_NAME_NOT_SUPPORTED },
      COUNTRY_NAME_REQUIRED: { properties: COUNTRY_NAME_REQUIRED },
      FIRST_NAME_INVALID_TYPE: { properties: FIRST_NAME_INVALID_TYPE },
      FIRST_NAME_MAXLENGTH_REACH: { properties: FIRST_NAME_MAXLENGTH_REACH },
      FIRST_NAME_MINLENGTH_REACH: { properties: FIRST_NAME_MINLENGTH_REACH },
      FIRST_NAME_REQUIRED: { properties: FIRST_NAME_REQUIRED },
      LAST_NAME_INVALID_TYPE: { properties: LAST_NAME_INVALID_TYPE },
      LAST_NAME_MAXLENGTH_REACH: { properties: LAST_NAME_MAXLENGTH_REACH },
      PHONE_NUMBER_INVALID: { properties: PHONE_NUMBER_INVALID },
      PHONE_NUMBER_INVALID_TYPE: { properties: PHONE_NUMBER_INVALID_TYPE },
      PHONE_NUMBER_MAXLENGTH_REACH: {
        properties: PHONE_NUMBER_MAXLENGTH_REACH,
      },
      PHONE_NUMBER_MINLENGTH_REACH: {
        properties: PHONE_NUMBER_MINLENGTH_REACH,
      },
      PHONE_NUMBER_NUMERIC: { properties: PHONE_NUMBER_NUMERIC },
      PHONE_NUMBER_REQUIRED: { properties: PHONE_NUMBER_REQUIRED },
      PRIVATE_ID_INVALID: { properties: PRIVATE_ID_INVALID },
      PRIVATE_ID_INVALID_TYPE: { properties: PRIVATE_ID_INVALID_TYPE },
      PRIVATE_ID_MAX_LENGTH_REACH: { properties: PRIVATE_ID_MAX_LENGTH_REACH },
      PRIVATE_ID_MIN_LENGTH_REACH: { properties: PRIVATE_ID_MIN_LENGTH_REACH },
      PRIVATE_ID_REQUIRED: { properties: PRIVATE_ID_REQUIRED },
      TOKEN_INVALID: { properties: TOKEN_INVALID },
      TOKEN_INVALID_TYPE: { properties: TOKEN_INVALID_TYPE },
      TOKEN_REQUIRED: { properties: TOKEN_REQUIRED },
      USERNAME_INVALID: { properties: USERNAME_INVALID },
      USERNAME_INVALID_TYPE: { properties: USERNAME_INVALID_TYPE },
      USERNAME_MAXLENGTH_REACH: { properties: USERNAME_MAXLENGTH_REACH },
      USERNAME_MINLENGTH_REACH: { properties: USERNAME_MINLENGTH_REACH },
      USERNAME_REQUIRED: { properties: USERNAME_REQUIRED },
      VERIFICATION_CODE_INVALID: { properties: VERIFICATION_CODE_INVALID },
      VERIFICATION_CODE_INVALID_LENGTH: {
        properties: VERIFICATION_CODE_INVALID_LENGTH,
      },
      VERIFICATION_CODE_INVALID_TYPE: {
        properties: VERIFICATION_CODE_INVALID_TYPE,
      },
      VERIFICATION_CODE_NUMERIC: { properties: VERIFICATION_CODE_NUMERIC },
      VERIFICATION_CODE_REQUIRED: { properties: VERIFICATION_CODE_REQUIRED },
    },
  },
} = require("@/variables/errors/userErrors");

const checkReturnCondition = (returnCondition, error) => {
  if (returnCondition) {
    return error;
  }

  throw error;
};

const bioValidator = validatorCompiler(bioValidationsModel);

const contactValidator = async (contact, returnCondition) => {
  try {
    await cellphoneValidator(contact);
    await firstNameValidator(contact.firstName);
    await lastNameValidator(contact.lastName);

    return { done: true };
  } catch (error) {
    logger.log("contactValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};
const compiledCountryCodeValidator = validatorCompiler(
  countryCodeValidationModel
);
const compiledCountryNameValidator = validatorCompiler(
  countryNameValidationModel
);
const createdAtValidator = validatorCompiler(createdAtValidationModel);
const compiledFirstNameValidator = validatorCompiler(firstNameValidationModel);
const compiledLastNameValidator = validatorCompiler(lastNameValidationModel);
const macAddressValidator = validatorCompiler(macAddressValidationModel);
const compiledPhoneNumberValidator = validatorCompiler(
  phoneNumberValidationModel
);
const compiledPrivateIdValidator = validatorCompiler(privateIdValidationModel);
const compiledTokenValidator = validatorCompiler(tokenValidationModel);
const compiledUsernameValidator = validatorCompiler(usernameValidationModel);
const compiledVerificationCodeValidator = validatorCompiler(
  verificationCodeValidationModel
);

//FIXME cellphoneValidator
const cellphoneValidator = async (cellphone = {}) => {
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
    throw error;
  }
};

const countryCodeValidator = async (countryCode, returnCondition) => {
  try {
    const result = await compiledCountryCodeValidator({ countryCode });

    if (result === true) {
      const country = countries.find((c) => c.countryCode === countryCode);

      errorThrower(country === undefined, () =>
        errorObject(COUNTRY_CODE_NOT_SUPPORTED)
      );

      return { done: true };
    }

    const { string, stringNumeric, stringMax, stringMin, required } =
      getValidatorErrorTypes(result);

    // eslint-disable-next-line no-inner-declarations
    function errorObject(errorObject) {
      return getErrorObject(errorObject, {
        validatedCountryCode: countryCode,
        validationResult: result,
      });
    }

    errorThrower(required, () => errorObject(COUNTRY_CODE_REQUIRED));

    errorThrower(string, () => errorObject(COUNTRY_CODE_INVALID_TYPE));

    errorThrower(stringNumeric, () => errorObject(COUNTRY_CODE_NUMERIC));

    errorThrower(stringMin, () => errorObject(COUNTRY_CODE_MINLENGTH_REACH));

    errorThrower(stringMax, () => errorObject(COUNTRY_CODE_MAXLENGTH_REACH));

    errorThrower(result !== true, () => errorObject(COUNTRY_CODE_INVALID));

    return { done: false, error: result };
  } catch (error) {
    logger.log("countryCodeValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const countryNameValidator = async (countryName, returnCondition) => {
  try {
    const result = await compiledCountryNameValidator({ countryName });

    if (result === true) {
      const country = countries.find((c) => c.countryName === countryName);

      errorThrower(country === undefined, () =>
        errorObject(COUNTRY_NAME_NOT_SUPPORTED)
      );

      return { done: true };
    }

    const { string, stringMax, stringMin, required } =
      getValidatorErrorTypes(result);

    function errorObject(errorObject) {
      return getErrorObject(errorObject, {
        validatedCountryName: countryName,
        validationResult: result,
      });
    }

    errorThrower(required, () => errorObject(COUNTRY_NAME_REQUIRED));

    errorThrower(string, () => errorObject(COUNTRY_NAME_INVALID_TYPE));

    errorThrower(stringMin, () => errorObject(COUNTRY_NAME_MINLENGTH_REACH));

    errorThrower(stringMax, () => errorObject(COUNTRY_NAME_MAXLENGTH_REACH));

    errorThrower(result !== true, () => errorObject(COUNTRY_NAME_INVALID));

    return { done: false, error: result };
  } catch (error) {
    logger.log("countryNameValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const firstNameValidator = async (firstName) => {
  const result = await compiledFirstNameValidator({ firstName });

  if (result === true) return { done: true };

  const { string, stringMax, stringMin, required } =
    getValidatorErrorTypes(result);

  const errorObject = (errorObject) =>
    getErrorObject(errorObject, {
      validatedFirstName: firstName,
      validationResult: result,
    });

  errorThrower(required, () => errorObject(FIRST_NAME_REQUIRED));

  errorThrower(string, () => errorObject(FIRST_NAME_INVALID_TYPE));

  errorThrower(stringMin, () => errorObject(FIRST_NAME_MINLENGTH_REACH));

  errorThrower(stringMax, () => errorObject(FIRST_NAME_MAXLENGTH_REACH));

  return { done: false, error: result };
};

const lastNameValidator = async (lastName) => {
  const result = await compiledLastNameValidator({ lastName });

  if (result === true) return { done: true };

  const { string, stringMax } = getValidatorErrorTypes(result);

  const errorObject = (errorObject) =>
    getErrorObject(errorObject, {
      validatedLastName: lastName,
      validationResult: result,
    });

  errorThrower(string, () => errorObject(LAST_NAME_INVALID_TYPE));

  errorThrower(stringMax, () => errorObject(LAST_NAME_MAXLENGTH_REACH));

  return { done: false, error: result };
};

const phoneNumberValidator = async (phoneNumber, returnCondition) => {
  try {
    const result = await compiledPhoneNumberValidator({ phoneNumber });

    if (result === true) return { done: true };

    const { stringNumeric, string, stringMax, stringMin, required } =
      getValidatorErrorTypes(result);

    const errorObject = (errorObject) =>
      getErrorObject(errorObject, {
        validatedPhoneNumber: phoneNumber,
        validationResult: result,
      });

    errorThrower(required, () => errorObject(PHONE_NUMBER_REQUIRED));

    errorThrower(string, () => errorObject(PHONE_NUMBER_INVALID_TYPE));

    errorThrower(stringNumeric, () => errorObject(PHONE_NUMBER_NUMERIC));

    errorThrower(stringMin, () => errorObject(PHONE_NUMBER_MINLENGTH_REACH));

    errorThrower(stringMax, () => errorObject(PHONE_NUMBER_MAXLENGTH_REACH));

    errorThrower(result !== true, () => errorObject(PHONE_NUMBER_INVALID));

    return { done: false, error: result };
  } catch (error) {
    logger.log("countryNameValidator catch, error:", error);
    return checkReturnCondition(returnCondition, error);
  }
};

const privateIdValidator = async (privateId) => {
  const result = await compiledPrivateIdValidator({ privateId });

  if (result === true) return { done: true };

  const { string, stringMax, stringMin, required } =
    getValidatorErrorTypes(result);

  const errorObject = (errorObject) =>
    getErrorObject(errorObject, {
      validatedPrivateId: privateId,
      validationResult: result,
    });

  errorThrower(required, () => errorObject(PRIVATE_ID_REQUIRED));

  errorThrower(string, () => errorObject(PRIVATE_ID_INVALID_TYPE));

  errorThrower(stringMin, () => errorObject(PRIVATE_ID_MIN_LENGTH_REACH));

  errorThrower(stringMax, () => errorObject(PRIVATE_ID_MAX_LENGTH_REACH));

  errorThrower(result !== true, errorObject(PRIVATE_ID_INVALID));

  return { done: false, error: result };
};

const tokenValidator = async (token, secret) => {
  try {
    const result = await compiledTokenValidator({ token });

    const errorObject = (errorObject) =>
      getErrorObject(errorObject, {
        validatedToken: token,
        validationResult: result,
      });

    if (result === true) {
      const verifiedToken = await tokenVerifier(
        token,
        secret || getEnvironment(ENVIRONMENT_KEYS.JWT_MAIN_SECRET)
      );

      if (verifiedToken.done === true) return verifiedToken.data;

      errorThrower(verifiedToken.done === false, () =>
        getErrorObject(errorObject, {
          validatedToken: token,
          validationResult: result,
          error: verifiedToken.error,
        })
      );
    }

    const { string, required } = getValidatorErrorTypes(result);

    errorThrower(required, () => errorObject(TOKEN_REQUIRED));

    errorThrower(string, () => errorObject(TOKEN_INVALID_TYPE));

    errorThrower(result !== true, () => errorObject(TOKEN_INVALID));

    return { done: false, error: result };
  } catch (error) {
    logger.log("tokenValidator catch, error:", error);
    return { done: false, error };
  }
};

const usernameValidator = async (username) => {
  const result = await compiledUsernameValidator({ username });

  if (result === true) return { done: true };

  const { string, stringMax, stringMin, required } =
    getValidatorErrorTypes(result);

  const errorObject = (errorObject) =>
    getErrorObject(errorObject, {
      validatedUsername: username,
      validationResult: result,
    });

  errorThrower(required, () => errorObject(USERNAME_REQUIRED));

  errorThrower(string, () => errorObject(USERNAME_INVALID_TYPE));

  errorThrower(stringMin, () => errorObject(USERNAME_MINLENGTH_REACH));

  errorThrower(stringMax, () => errorObject(USERNAME_MAXLENGTH_REACH));

  errorThrower(result !== true, () => errorObject(USERNAME_INVALID));

  return { done: false, error: result };
};

const verificationCodeValidator = async (verificationCode) => {
  const result = await compiledVerificationCodeValidator({ verificationCode });
  logger.log("verificationCodeValidator result", result);

  if (result === true) return { done: true };

  const { string, stringNumeric, stringEmpty, required, stringLength } =
    getValidatorErrorTypes(result);

  const errorObject = (errorObject) =>
    getErrorObject(errorObject, {
      validatedVerificationCode: verificationCode,
      validationResult: result,
    });

  errorThrower(stringEmpty || required, () =>
    errorObject(VERIFICATION_CODE_REQUIRED)
  );

  errorThrower(string, () => errorObject(VERIFICATION_CODE_INVALID_TYPE));

  errorThrower(stringNumeric, () => errorObject(VERIFICATION_CODE_NUMERIC));

  errorThrower(stringLength, () =>
    errorObject(VERIFICATION_CODE_INVALID_LENGTH)
  );

  errorThrower(result !== true, () => errorObject(VERIFICATION_CODE_INVALID));

  return { done: false, error: result };
};

module.exports = {
  verificationCodeValidator,
  bioValidator,
  cellphoneValidator,
  countryCodeValidator,
  contactValidator,
  countryNameValidator,
  createdAtValidator,
  firstNameValidator,
  lastNameValidator,
  macAddressValidator,
  phoneNumberValidator,
  privateIdValidator,
  tokenValidator,
  usernameValidator,
};
